# Contributing to Sorting Algorithm Visualizer

First off, thank you for considering contributing to the Sorting Algorithm Visualizer! 🎉

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Browser and OS** information

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- **Clear description** of the feature
- **Use case** - why is this useful?
- **Possible implementation** approach (if you have ideas)
- **Mockups or examples** if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test thoroughly** - ensure everything works
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit the pull request**

## 🎯 Areas for Contribution

### Easy (Good First Issues)
- Add new color themes
- Improve mobile responsiveness
- Add keyboard shortcuts
- Enhance accessibility (ARIA labels, focus states)
- Fix typos or improve documentation

### Medium
- Add new sorting algorithms (Heap Sort, Shell Sort, Radix Sort)
- Implement step-by-step manual mode
- Add export functionality (save as image/GIF)
- Improve performance for large arrays
- Add algorithm comparison view

### Advanced
- Implement visualization for other data structures (Trees, Graphs)
- Add time complexity graph overlay
- Create algorithm race mode (compare multiple algorithms side-by-side)
- Add code editor to modify algorithms in real-time
- Implement algorithm visualization recording/playback

## 💻 Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/deadpickerotaku/algovisualiser.git
cd algovisualiser

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📝 Coding Standards

### JavaScript/React
- Use **functional components** with hooks
- Follow **React best practices** (avoid unnecessary re-renders)
- Use **meaningful variable names**
- Add **comments for complex logic**
- Keep components **focused and modular**

### Styling
- Use **Tailwind utility classes**
- Follow the existing **color scheme** (indigo, purple, emerald, rose, amber)
- Ensure **responsive design** (mobile-first approach)
- Maintain **consistent spacing** and layout

### Algorithm Implementation
```javascript
// Example: Adding a new sorting algorithm
function* yourSort(arr) {
  const array = [...arr];
  
  // Algorithm logic with yield statements
  yield { type: 'compare', indices: [i, j] };
  yield { type: 'swap', indices: [i, j], array: [...array] };
  yield { type: 'markSorted', index: i };
  
  return array;
}

// Add to ALGORITHMS object
const ALGORITHMS = {
  yourAlgo: {
    name: 'Your Algorithm Name',
    fn: yourSort,
    timeComplexity: 'O(?)',
    spaceComplexity: 'O(?)',
    description: 'Brief explanation of how it works...',
  },
};
```

## 🧪 Testing

Before submitting:
- [ ] Test with different array sizes (5, 30, 100 elements)
- [ ] Test all algorithms work correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test both dark and light themes
- [ ] Ensure no console errors

## 📋 Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add heap sort algorithm
fix: Resolve pause button state issue
docs: Update README with new screenshots
style: Improve mobile layout spacing
perf: Optimize animation rendering
refactor: Extract algorithm logic into separate file
```

Prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style/formatting (not CSS)
- `perf:` - Performance improvements
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sorting Algorithm Visualizations](https://visualgo.net/en/sorting)

## ❓ Questions?

Feel free to:
- Open a [Discussion](https://github.com/deadpickerotaku/algovisualiser/discussions)
- Comment on existing issues
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙌
