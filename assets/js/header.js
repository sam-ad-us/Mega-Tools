// Tool data for search
const toolsList = [
  // Image Tools
  { name: "Image to PNG Converter", category: "Image Tools", file: "tools/image-to-png.html" },
  { name: "Image to JPG Converter", category: "Image Tools", file: "tools/image-to-jpg.html" },
  { name: "Image Resizer", category: "Image Tools", file: "tools/image-resizer.html" },
  { name: "Image Compressor", category: "Image Tools", file: "tools/image-compressor.html" },
  { name: "Image Cropper", category: "Image Tools", file: "tools/image-cropper.html" },
  { name: "Convert Image to Base64", category: "Image Tools", file: "tools/image-to-base64.html" },
  { name: "GIF Maker", category: "Image Tools", file: "tools/gif-maker.html" },

  // Text Tools
  { name: "Character Counter", category: "Text Tools", file: "tools/character-counter.html" },
  { name: "Word Counter", category: "Text Tools", file: "tools/word-counter.html" },
  { name: "Case Converter", category: "Text Tools", file: "tools/case-converter.html" },
  { name: "Plagiarism Checker", category: "Text Tools", file: "tools/plagiarism-checker.html" },
  { name: "Grammar Checker", category: "Text Tools", file: "tools/grammar-checker.html" },
  { name: "Text-to-Speech", category: "Text Tools", file: "tools/text-to-speech.html" },
  { name: "Speech-to-Text", category: "Text Tools", file: "tools/speech-to-text.html" },
  { name: "Fancy Text Generator", category: "Text Tools", file: "tools/fancy-text-generator.html" },
  { name: "URL Encoder & Decoder", category: "Text Tools", file: "tools/url-encoder-decoder.html" },
  { name: "Random Text Generator", category: "Text Tools", file: "tools/random-text-generator.html" },

  // Developer Tools
  { name: "JSON Formatter", category: "Developer Tools", file: "tools/json-formatter.html" },
  { name: "HTML to Markdown", category: "Developer Tools", file: "tools/html-to-markdown.html" },
  { name: "CSS Minifier", category: "Developer Tools", file: "tools/css-minifier.html" },
  { name: "JavaScript Minifier", category: "Developer Tools", file: "tools/js-minifier.html" },
  { name: "SQL Formatter", category: "Developer Tools", file: "tools/sql-formatter.html" },
  { name: "Base64 Encoder & Decoder", category: "Developer Tools", file: "tools/base64-encoder-decoder.html" },

  // Math & Calculators
  { name: "Percentage Calculator", category: "Math & Calculators", file: "tools/percentage-calculator.html" },
  { name: "Age Calculator", category: "Math & Calculators", file: "tools/age-calculator.html" },
  { name: "BMI Calculator", category: "Math & Calculators", file: "tools/bmi-calculator.html" },
  { name: "Scientific Calculator", category: "Math & Calculators", file: "tools/scientific-calculator.html" },
  { name: "Discount Calculator", category: "Math & Calculators", file: "tools/discount-calculator.html" },
  { name: "Currency Converter", category: "Math & Calculators", file: "tools/currency-converter.html" },

  // Unit Converters
  { name: "Length Converter", category: "Unit Converters", file: "tools/length-converter.html" },
  { name: "Temperature Converter", category: "Unit Converters", file: "tools/temperature-converter.html" },
  { name: "Weight Converter", category: "Unit Converters", file: "tools/weight-converter.html" },
  { name: "Speed Converter", category: "Unit Converters", file: "tools/speed-converter.html" },
  { name: "Volume Converter", category: "Unit Converters", file: "tools/volume-converter.html" },
  { name: "Energy Converter", category: "Unit Converters", file: "tools/energy-converter.html" }
];

function loadHeader() {
  fetch('header.html')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.text();
    })
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      initializeSearch();
    })
    .catch(() => {
      fetch('../header.html')
        .then(res => res.text())
        .then(data => {
          document.body.insertAdjacentHTML('afterbegin', data);
          initializeSearch();
        });
    });
}

function initializeSearch() {
  const searchInput = document.getElementById('tool-search');
  const searchResults = document.getElementById('search-results');
  const resultsList = searchResults.querySelector('.list-group');
  let selectedIndex = -1;

  // Search function
  function performSearch(query) {
    if (!query) {
      searchResults.classList.add('d-none');
      return;
    }

    const results = toolsList.filter(tool => {
      const searchString = `${tool.name} ${tool.category}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });

    if (results.length === 0) {
      searchResults.classList.add('d-none');
      return;
    }

    // Show results
    resultsList.innerHTML = results.map((tool, index) => {
      const nameHighlighted = highlightMatch(tool.name, query);
      const categoryHighlighted = highlightMatch(tool.category, query);
      return `
        <a href="${getToolPath(tool.file)}" class="list-group-item list-group-item-action search-result-item" data-index="${index}">
          <div>${nameHighlighted}</div>
          <div class="search-result-category">${categoryHighlighted}</div>
        </a>
      `;
    }).join('');

    searchResults.classList.remove('d-none');
    selectedIndex = -1;
  }

  // Highlight matching text
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Get correct tool path based on current location
  function getToolPath(file) {
    const isInToolsFolder = window.location.pathname.includes('/tools/');
    return isInToolsFolder ? '../' + file : file;
  }

  // Event listeners
  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value.trim());
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      searchResults.classList.remove('d-none');
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('d-none');
    }
  });

  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsList.querySelectorAll('.search-result-item');
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(items);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          window.location.href = items[selectedIndex].href;
        }
        break;
      case 'Escape':
        searchResults.classList.add('d-none');
        searchInput.blur();
        break;
    }
  });

  function updateSelection(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }
}

loadHeader();
