# 🎨 AlgoVisualiser

> An elegant, interactive web application that brings sorting algorithms to life through smooth animations and step-by-step visual explanations.

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-ff0055)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-38b2ac?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Sorting Visualizer Demo](https://img.shields.io/badge/Status-Ready%20to%20Deploy-success)

---

## ✨ Features

### 🔢 **5 Sorting Algorithms Implemented**
- **Bubble Sort** - O(n²) | Simple comparison-based algorithm
- **Selection Sort** - O(n²) | Minimum selection approach
- **Insertion Sort** - O(n²) | Incremental building method
- **Merge Sort** - O(n log n) | Divide and conquer strategy
- **Quick Sort** - O(n log n) | Efficient partition-based sorting

### 🎯 **Interactive Controls**
- 🎲 **Random Array Generation** (5-100 elements)
- ✏️ **Custom Array Input** (comma-separated values)
- ⚡ **Adjustable Speed Control** (1% - 100%)
- ⏯️ **Pause/Resume/Reset** functionality
- 🔊 **Optional Sound Effects** using Web Audio API
- 🌓 **Dark/Light Theme Toggle**

### 🎨 **Visual Excellence**
- **Color-Coded States**:
  - 🔵 Blue → Unsorted elements
  - 🟡 Yellow → Elements being compared
  - 🔴 Red → Elements being swapped
  - 🟢 Green → Sorted elements
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** for mobile, tablet, and desktop
- **Custom Typography** (Crimson Pro + Space Mono)

### 📚 **Educational Features**
- Real-time step descriptions
- Time & space complexity display
- Algorithm explanation panels
- Hover to see element values

---

## 🚀 Quick Start

### Option 1: Standalone HTML (Zero Setup!) ⚡

**Perfect for: Quick demos, sharing, or offline use**

1. Download `standalone-visualizer.html`
2. Double-click to open in your browser
3. Start visualizing!

✅ No installation required  
✅ No dependencies to download  
✅ Works offline after first load  

### Option 2: Full Development Setup

**Perfect for: Development, customization, or production builds**

```bash
# Clone the repository
git clone https://github.com/deadpickerotaku/algovisualiser.git
cd algovisualiser

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📸 Screenshots

### Dark Theme
![Dark Theme](https://via.placeholder.com/800x450/1e293b/ffffff?text=Dark+Theme+Screenshot)

### Light Theme
![Light Theme](https://via.placeholder.com/800x450/f8fafc/1e293b?text=Light+Theme+Screenshot)

*Replace these placeholder images with actual screenshots of your visualizer*

---

## 🎮 How to Use

### Getting Started
1. **Select Algorithm**: Choose from Bubble, Selection, Insertion, Merge, or Quick Sort
2. **Configure Array**: 
   - Use slider to set size (5-100 elements)
   - Generate random array, OR
   - Input custom values: `64, 34, 25, 12, 22`
3. **Adjust Speed**: Control animation pace (1-100%)
4. **Start Sorting**: Click "Start" and watch the magic! ✨

### During Visualization
- **Pause**: Stop animation to examine current state
- **Resume**: Continue from where you paused
- **Reset**: Generate new array and start over

### Customization
- **Sound Effects**: Toggle audio feedback on/off
- **Theme**: Switch between dark and light modes
- **Array Values**: Hover over bars to see values (arrays ≤30 elements)

---

## 🏗️ Project Structure

```
algovisualiser/
├── index.html                  # HTML entry point
├── main.jsx                    # React entry point
├── algovisualiser.jsx      # Main app component (800+ lines)
│   ├── Sorting Algorithms      # Generator functions for each algorithm
│   ├── Algorithm Metadata      # Complexity info & descriptions
│   └── Visualizer Component    # UI, state management, animations
├── index.css                   # Global styles + Tailwind directives
├── package.json                # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind theme customization
├── postcss.config.js          # PostCSS configuration
├── standalone-visualizer.html  # Zero-dependency version
├── README.md                   # This file
├── QUICKSTART.md              # Quick deployment guide
└── LICENSE                     # MIT License
```

---

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library with hooks | 18.2.0 |
| **Framer Motion** | Animation library | 10.16.4 |
| **Tailwind CSS** | Utility-first CSS | 3.3.5 |
| **Vite** | Build tool & dev server | 5.0+ |
| **Web Audio API** | Sound effect generation | Native |

---

## 🧩 Algorithm Details

### Bubble Sort
```javascript
Time: O(n²) | Space: O(1)
```
Simple but inefficient. Great for learning. Repeatedly swaps adjacent elements.

### Selection Sort
```javascript
Time: O(n²) | Space: O(1)
```
Finds minimum element and places it at the beginning. Fewer swaps than Bubble Sort.

### Insertion Sort
```javascript
Time: O(n²) | Space: O(1)
```
Builds sorted array incrementally. Efficient for small or nearly-sorted data.

### Merge Sort
```javascript
Time: O(n log n) | Space: O(n)
```
Divide-and-conquer approach. Consistently efficient but uses extra space.

### Quick Sort
```javascript
Time: O(n log n) avg | Space: O(log n)
```
Partition-based sorting. Very efficient in practice, industry standard.

---

## 💡 Key Features Implementation

### Generator Functions for Step-by-Step Execution
```javascript
function* bubbleSort(arr) {
  // ...algorithm logic
  yield { type: 'compare', indices: [i, j] };
  yield { type: 'swap', indices: [i, j], array: [...array] };
  yield { type: 'markSorted', index: i };
}
```

### Animation Loop with State Management
```javascript
// Process each step and update UI state
switch (type) {
  case 'compare':
    setComparing(indices);      // Highlight in yellow
    break;
  case 'swap':
    setSwapping(indices);       // Highlight in red
    setArray(newArray);         // Update bar heights
    break;
  case 'markSorted':
    setSorted([...sorted, i]);  // Mark as green
    break;
}
```

### Smooth Animations with Framer Motion
```javascript
<motion.div
  layout
  initial={{ scaleY: 0 }}
  animate={{ scaleY: 1 }}
  transition={{ type: 'spring', stiffness: 300 }}
  className={getBarColor(index)}
/>
```

---

## 🎓 Educational Value

This visualizer is perfect for:
- **Students** learning data structures and algorithms
- **Teachers** demonstrating sorting concepts in class
- **Developers** understanding algorithm behavior and complexity
- **Interview Prep** visualizing common coding interview questions

### Learning Outcomes
- Understand how different algorithms process data
- Compare efficiency between O(n²) and O(n log n) approaches
- Observe the trade-offs between time and space complexity
- See the impact of different input patterns (random, sorted, reversed)

---

## 🔧 Customization Guide

### Adding a New Algorithm

1. **Create the generator function:**
```javascript
function* yourSort(arr) {
  const array = [...arr];
  // Your algorithm logic here
  yield { type: 'compare', indices: [i, j] };
  yield { type: 'swap', indices: [i, j], array: [...array] };
  return array;
}
```

2. **Add to ALGORITHMS object:**
```javascript
const ALGORITHMS = {
  // ...existing algorithms
  yourAlgo: {
    name: 'Your Algorithm',
    fn: yourSort,
    timeComplexity: 'O(?)',
    spaceComplexity: 'O(?)',
    description: 'Description here...',
  },
};
```

### Changing Colors
Edit the `getBarColor` function:
```javascript
const getBarColor = (index) => {
  if (sorted.includes(index)) return 'bg-emerald-500';    // Green
  if (swapping.includes(index)) return 'bg-rose-500';     // Red
  if (comparing.includes(index)) return 'bg-amber-400';   // Yellow
  return 'bg-slate-400';                                   // Default
};
```

### Adjusting Animation Speed
Modify the delay calculation:
```javascript
const delay = (101 - speed) * 10; // 10ms to 1000ms range
```

---

## 📊 Performance

- ✅ Handles arrays up to 100 elements smoothly
- ✅ 60 FPS animations on modern browsers
- ✅ Optimized React rendering with proper state updates
- ✅ Efficient generator-based algorithm execution
- ✅ No blocking operations on main thread

---

## 🐛 Troubleshooting

### Standalone HTML Issues
**Problem**: Page doesn't load  
**Solution**: Ensure internet connection for CDN libraries (first load only)

**Problem**: Animations are choppy  
**Solution**: Reduce array size or use a modern browser (Chrome/Firefox/Edge)

### Development Setup Issues
**Problem**: `npm install` fails  
**Solution**: 
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 3000 already in use  
**Solution**: Change port in `vite.config.js` or kill the process using port 3000

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- [ ] Add more algorithms (Heap Sort, Radix Sort, Shell Sort)
- [ ] Implement step-by-step manual mode
- [ ] Add algorithm comparison mode
- [ ] Create visualization for other data structures
- [ ] Add more themes and color schemes
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Export visualization as GIF/video

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Framer** - For the powerful animation library
- **Tailwind Labs** - For the utility-first CSS framework
- **The CS Community** - For comprehensive algorithm resources

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/deadpickerotaku/algovisualiser/issues)
- **Discussions**: [GitHub Discussions](https://github.com/deadpickerotaku/algovisualiser/discussions)

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using React, Framer Motion, and Tailwind CSS**

[Live Demo](#) | [Report Bug](https://github.com/deadpickerotaku/algovisualiser/issues) | [Request Feature](https://github.com/deadpickerotaku/algovisualiser/issues)

</div>
