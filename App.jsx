import { useState, useEffect, useRef } from 'react';
import { ALGORITHMS } from './algorithms';
import './App.css';

export default function App() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [currentStep, setCurrentStep] = useState('');
  const [arraySize, setArraySize] = useState(30);
  const [customInput, setCustomInput] = useState('');

  const generatorRef = useRef(null);
  // Live values for the async loop to check. useState values are captured
  // (stale) at the moment startSorting() is called; useRef.current always
  // reflects the latest value, which is what makes Pause/Reset instant.
  const isRunningRef = useRef(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);
    resetVisualization();
  };

  const setCustomArray = () => {
    const values = customInput
      .split(',')
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v) && v > 0 && v <= 100)
      .slice(0, 100); // cap at 100 elements

    if (values.length > 0) {
      setArray(values);
      setArraySize(values.length);
      resetVisualization();
      setCustomInput('');
    } else {
      alert('Invalid input. Use comma-separated numbers (1-100).');
    }
  };

  const resetVisualization = () => {
    setIsRunning(false);
    isRunningRef.current = false;
    setIsPaused(false);
    isPausedRef.current = false;
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCurrentStep('');
    generatorRef.current = null;
  };

  const startSorting = async () => {
    if (isRunningRef.current && !isPausedRef.current) return;

    if (!generatorRef.current) {
      resetVisualization();
      const sortFn = ALGORITHMS[algorithm].fn;
      generatorRef.current = sortFn([...array]);
    }

    setIsRunning(true);
    isRunningRef.current = true;
    setIsPaused(false);
    isPausedRef.current = false;

    const delay = (101 - speed) * 10;

    try {
      let step = generatorRef.current.next();

      while (!step.done && isRunningRef.current) {
        const { type, indices, array: newArray } = step.value;

        switch (type) {
          case 'compare':
            setComparing(indices);
            setSwapping([]);
            setCurrentStep(`Comparing positions ${indices.join(' and ')}`);
            break;
          case 'swap':
            setSwapping(indices);
            setComparing([]);
            setArray(newArray);
            setCurrentStep(`Swapping positions ${indices.join(' and ')}`);
            break;
          case 'overwrite':
            setArray(newArray);
            setSwapping(indices);
            setComparing([]);
            setCurrentStep(`Inserting element at position ${indices[0]}`);
            break;
          case 'markSorted':
            setSorted((prev) => [...prev, indices]);
            setCurrentStep(`Position ${indices} is now in final place`);
            break;
          default:
            break;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));

        // Poll here while paused; isPausedRef is checked live so Pause
        // takes effect immediately, mid-animation.
        while (isPausedRef.current && isRunningRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (!isRunningRef.current) break; // Reset pressed while paused

        step = generatorRef.current.next();
      }

      if (step.done) {
        setSorted(array.map((_, i) => i));
        setCurrentStep('Sorting complete!');
        setIsRunning(false);
        isRunningRef.current = false;
      }
    } catch (error) {
      console.error('Sorting error:', error);
      resetVisualization();
    }
  };

  const togglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    isPausedRef.current = next;
  };

  const stopSorting = () => {
    isRunningRef.current = false;
    isPausedRef.current = false;
    resetVisualization();
    generateRandomArray();
  };

  const getBarClass = (index) => {
    if (sorted.includes(index)) return 'bar bar-sorted';
    if (swapping.includes(index)) return 'bar bar-swapping';
    if (comparing.includes(index)) return 'bar bar-comparing';
    return 'bar';
  };

  const info = ALGORITHMS[algorithm];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Algorithm Visualiser</h1>
        <p>Watch sorting algorithms run step by step</p>
      </header>

      <div className="layout">
        {/* Controls */}
        <div className="panel">
          <h2>Algorithm</h2>
          <select
            value={algorithm}
            onChange={(e) => {
              setAlgorithm(e.target.value);
              resetVisualization();
            }}
            disabled={isRunning}
          >
            {Object.entries(ALGORITHMS).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>

          <div className="info-box">
            <div className="info-row">
              <span>Time Complexity</span>
              <strong>{info.timeComplexity}</strong>
            </div>
            <div className="info-row">
              <span>Space Complexity</span>
              <strong>{info.spaceComplexity}</strong>
            </div>
            <p className="description">{info.description}</p>
          </div>

          <h2>Array</h2>
          <label>
            Size: {arraySize}
            <input
              type="range"
              min="5"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value, 10))}
              disabled={isRunning}
            />
          </label>
          <button onClick={generateRandomArray} disabled={isRunning}>
            Generate Random Array
          </button>

          <div className="custom-input-row">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 64, 34, 25, 12"
              disabled={isRunning}
            />
            <button onClick={setCustomArray} disabled={isRunning}>Set</button>
          </div>

          <h2>Controls</h2>
          <label>
            Speed: {speed}%
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
            />
          </label>

          <div className="button-row">
            <button className="btn-start" onClick={startSorting} disabled={isRunning && !isPaused}>
              {isRunning && !isPaused ? 'Running…' : isPaused ? 'Resume' : 'Start'}
            </button>
            <button className="btn-pause" onClick={togglePause} disabled={!isRunning}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <button className="btn-reset" onClick={stopSorting}>Reset</button>
        </div>

        {/* Visualization */}
        <div className="visual-area">
          <div className="status-box">
            {isRunning && <span className="status-dot" />}
            <p>{currentStep || 'Press Start to begin sorting…'}</p>
          </div>

          <div className="bars-container">
            {array.map((value, index) => (
              <div
                key={index}
                className={getBarClass(index)}
                style={{ height: `${value}%` }}
                title={value}
              />
            ))}
          </div>

          <div className="legend">
            <span><i className="dot dot-default" /> Unsorted</span>
            <span><i className="dot dot-comparing" /> Comparing</span>
            <span><i className="dot dot-swapping" /> Swapping</span>
            <span><i className="dot dot-sorted" /> Sorted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
