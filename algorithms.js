// ============================================================================
// SORTING ALGORITHMS
// Each is a generator function. yield pauses execution and hands a "step"
// back to the caller (compare / swap / overwrite / markSorted), which is
// what makes step-by-step animation possible instead of the array
// finishing sorted instantly.
// ============================================================================

/**
 * Bubble Sort - Repeatedly steps through list, compares adjacent elements
 * Time: O(n²) | Space: O(1)
 */
export function* bubbleSort(arr) {
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield { type: 'swap', indices: [j, j + 1], array: [...array] };
      }
    }
    yield { type: 'markSorted', index: n - i - 1 };
  }
  yield { type: 'markSorted', index: 0 };
  return array;
}

/**
 * Selection Sort - Finds minimum element and places it at beginning
 * Time: O(n²) | Space: O(1)
 */
export function* selectionSort(arr) {
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield { type: 'compare', indices: [minIdx] };

    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [minIdx, j] };
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield { type: 'swap', indices: [i, minIdx], array: [...array] };
    }
    yield { type: 'markSorted', index: i };
  }
  yield { type: 'markSorted', index: n - 1 };
  return array;
}

/**
 * Insertion Sort - Builds final sorted array one item at a time
 * Time: O(n²) worst, O(n) best | Space: O(1)
 */
export function* insertionSort(arr) {
  const array = [...arr];
  const n = array.length;

  yield { type: 'markSorted', index: 0 };

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    yield { type: 'compare', indices: [i] };

    while (j >= 0 && array[j] > key) {
      yield { type: 'compare', indices: [j, j + 1] };
      array[j + 1] = array[j];
      yield { type: 'overwrite', indices: [j + 1], array: [...array] };
      j--;
    }

    array[j + 1] = key;
    yield { type: 'overwrite', indices: [j + 1], array: [...array] };
    yield { type: 'markSorted', index: i };
  }
  return array;
}

/**
 * Merge Sort - Divide and conquer
 * Time: O(n log n) | Space: O(n)
 */
export function* mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);

  yield* mergeSort(arr, start, mid);
  yield* mergeSort(arr, mid + 1, end);
  yield* merge(arr, start, mid, end);
}

function* merge(arr, start, mid, end) {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    yield { type: 'compare', indices: [start + i, mid + 1 + j] };

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      yield { type: 'overwrite', indices: [k], array: [...arr] };
      i++;
    } else {
      arr[k] = right[j];
      yield { type: 'overwrite', indices: [k], array: [...arr] };
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    yield { type: 'overwrite', indices: [k], array: [...arr] };
    i++; k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    yield { type: 'overwrite', indices: [k], array: [...arr] };
    j++; k++;
  }

  for (let idx = start; idx <= end; idx++) {
    yield { type: 'markSorted', index: idx };
  }
}

/**
 * Quick Sort - Divide and conquer with pivot partitioning
 * Time: O(n log n) avg, O(n²) worst | Space: O(log n)
 */
export function* quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = yield* partition(arr, low, high);
    yield* quickSort(arr, low, pi - 1);
    yield* quickSort(arr, pi + 1, high);
  } else if (low === high) {
    yield { type: 'markSorted', index: low };
  }
}

function* partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  yield { type: 'compare', indices: [high] };

  for (let j = low; j < high; j++) {
    yield { type: 'compare', indices: [j, high] };
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { type: 'swap', indices: [i, j], array: [...arr] };
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield { type: 'swap', indices: [i + 1, high], array: [...arr] };
  yield { type: 'markSorted', index: i + 1 };

  return i + 1;
}

// ============================================================================
// ALGORITHM METADATA — drives the dropdown + info panel in the UI
// ============================================================================
export const ALGORITHMS = {
  bubble: {
    name: 'Bubble Sort',
    fn: bubbleSort,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Repeatedly compares adjacent elements and swaps them if they are in the wrong order.',
  },
  selection: {
    name: 'Selection Sort',
    fn: selectionSort,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element from the unsorted portion and places it at the beginning.',
  },
  insertion: {
    name: 'Insertion Sort',
    fn: insertionSort,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one element at a time by inserting elements into their correct position.',
  },
  merge: {
    name: 'Merge Sort',
    fn: mergeSort,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide-and-conquer algorithm that splits the array, sorts each half, and merges them back.',
  },
  quick: {
    name: 'Quick Sort',
    fn: quickSort,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Selects a pivot and partitions the array around it. Fast in practice; worst case is O(n²).',
  },
};
