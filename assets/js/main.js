const tools = [
  // Image Tools
  { name: "Image to PNG Converter", category: "Image Tools", file: "tools/image-to-png.html" },
  { name: "Image to JPG Converter", category: "Image Tools", file: "tools/image-to-jpg.html" },
  { name: "Image Resizer", category: "Image Tools", file: "tools/image-resizer.html" },
  { name: "Image Compressor", category: "Image Tools", file: "tools/image-compressor.html" },
  { name: "Image Cropper", category: "Image Tools", file: "tools/image-cropper.html" },
  { name: "Convert Image to Base64", category: "Image Tools", file: "tools/image-to-base64.html" },

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

  // SEO Tools
  { name: "Meta Tag Generator", category: "SEO Tools", file: "tools/meta-tag-generator.html" },
  { name: "Keyword Density Checker", category: "SEO Tools", file: "tools/keyword-density-checker.html" },
  { name: "Sitemap Generator", category: "SEO Tools", file: "tools/sitemap-generator.html" },
  { name: "Robots.txt Generator", category: "SEO Tools", file: "tools/robots-txt-generator.html" },
  { name: "Google Index Checker", category: "SEO Tools", file: "tools/google-index-checker.html" },
  { name: "Domain Authority Checker", category: "SEO Tools", file: "tools/domain-authority-checker.html" },
  { name: "Backlink Checker", category: "SEO Tools", file: "tools/backlink-checker.html" },
  { name: "Page Speed Checker", category: "SEO Tools", file: "tools/page-speed-checker.html" },
  { name: "XML Sitemap Validator", category: "SEO Tools", file: "tools/xml-sitemap-validator.html" },
  { name: "Mobile-Friendly Test", category: "SEO Tools", file: "tools/mobile-friendly-test.html" },
  // ... add more tools as needed ...
];

function renderTools() {
  const categories = [...new Set(tools.map(t => t.category))];
  categories.forEach(cat => {
    const catId = cat.toLowerCase().replace(/\s+/g, '-') + '-list';
    const container = document.getElementById(catId);
    if (container) {
      container.innerHTML = tools.filter(t => t.category === cat).map(tool => `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${tool.name}</h5>
              <a href="${tool.file}" class="btn btn-primary">Open</a>
            </div>
          </div>
        </div>
      `).join('');
    }
  });
}

document.addEventListener('DOMContentLoaded', renderTools);
