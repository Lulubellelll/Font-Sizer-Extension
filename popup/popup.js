const increaseFontBtn = document.getElementById("increase-font");
const decreaseFontBtn = document.getElementById("decrease-font");
const resetFontBtn = document.getElementById("reset-font");
const themeToggle = document.getElementById("theme-toggle");
const fontSlider = document.getElementById("font-slider");
const fontSliderValue = document.getElementById("font-slider-value");

// Initialize theme
async function initializeTheme() {
  try {
    const result = await chrome.storage.sync.get(['theme']);
    const theme = result.theme || 'light';
    document.body.setAttribute('data-theme', theme);
  } catch (error) {
    console.error('Error loading theme:', error);
    document.body.setAttribute('data-theme', 'light');
  }
}

// Toggle theme
themeToggle.addEventListener('click', async () => {
  try {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    await chrome.storage.sync.set({ theme: newTheme });
  } catch (error) {
    console.error('Error saving theme:', error);
  }
});

// Initialize theme on popup load
initializeTheme();

increaseFontBtn.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || selection.getRangeAt(0).collapsed) {
          return { success: false, message: "No text selected" };
        }
        
        try {
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');
          
          // Get the truly original font size (before any modifications)
          const tempElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
            ? range.commonAncestorContainer.parentNode 
            : range.commonAncestorContainer;
          
          let originalSize;
          // If this element already has a stored original size, use that
          if (tempElement.tagName === 'SPAN' && tempElement.dataset.originalFontSize) {
            originalSize = parseFloat(tempElement.dataset.originalFontSize);
            const currentSize = parseFloat(window.getComputedStyle(tempElement).fontSize) || originalSize;
            const newSize = currentSize * 1.2;
            tempElement.style.fontSize = newSize + 'px';
            
            // Reselect the existing span
            const newRange = document.createRange();
            newRange.selectNodeContents(tempElement);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            return { success: true, message: `Font size changed to ${newSize}px (original: ${originalSize}px)` };
          } else {
            // This is a fresh selection - get the original font size
            originalSize = parseFloat(window.getComputedStyle(tempElement).fontSize) || 16;
            const newSize = originalSize * 1.2;
            
            span.style.fontSize = newSize + 'px';
            span.style.fontWeight = 'inherit';
            span.style.color = 'inherit';
            
            // Store the true original font size
            span.dataset.originalFontSize = originalSize;
          }
          
          // Wrap selection
          const contents = range.extractContents();
          span.appendChild(contents);
          range.insertNode(span);
          
          // Reselect the span content to maintain selection
          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          return { success: true, message: `Font size changed from ${currentSize}px to ${newSize}px` };
        } catch (error) {
          return { success: false, message: `Error: ${error.message}` };
        }
      }
    });
    
  } catch (e) {
    console.error('Font size increase error:', e);
  }
});

decreaseFontBtn.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || selection.getRangeAt(0).collapsed) {
          return { success: false, message: "No text selected" };
        }
        
        try {
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');
          
          // Get the truly original font size (before any modifications)
          const tempElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
            ? range.commonAncestorContainer.parentNode 
            : range.commonAncestorContainer;
          
          let originalSize;
          // If this element already has a stored original size, use that
          if (tempElement.tagName === 'SPAN' && tempElement.dataset.originalFontSize) {
            originalSize = parseFloat(tempElement.dataset.originalFontSize);
            const currentSize = parseFloat(window.getComputedStyle(tempElement).fontSize) || originalSize;
            const newSize = Math.max(8, currentSize * 0.8);
            tempElement.style.fontSize = newSize + 'px';
            
            // Reselect the existing span
            const newRange = document.createRange();
            newRange.selectNodeContents(tempElement);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            return { success: true, message: `Font size changed to ${newSize}px (original: ${originalSize}px)` };
          } else {
            // This is a fresh selection - get the original font size
            originalSize = parseFloat(window.getComputedStyle(tempElement).fontSize) || 16;
            const newSize = Math.max(8, originalSize * 0.8);
            
            span.style.fontSize = newSize + 'px';
            span.style.fontWeight = 'inherit';
            span.style.color = 'inherit';
            
            // Store the true original font size
            span.dataset.originalFontSize = originalSize;
          }
          
          // Wrap selection
          const contents = range.extractContents();
          span.appendChild(contents);
          range.insertNode(span);
          
          // Reselect the span content to maintain selection
          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(newRange);
          
          return { success: true, message: `Font size changed from ${currentSize}px to ${newSize}px` };
        } catch (error) {
          return { success: false, message: `Error: ${error.message}` };
        }
      }
    });
    
  } catch (e) {
    console.error('Font size decrease error:', e);
  }
});

resetFontBtn.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || selection.getRangeAt(0).collapsed) {
          return { success: false, message: "No text selected" };
        }
        
        try {
          const range = selection.getRangeAt(0);
          const selectedElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
            ? range.commonAncestorContainer.parentNode
            : range.commonAncestorContainer;
          
          // Check if we're dealing with a span that has original font size stored
          if (selectedElement.tagName === 'SPAN' && selectedElement.dataset.originalFontSize) {
            const originalSize = parseFloat(selectedElement.dataset.originalFontSize);
            selectedElement.style.fontSize = originalSize + 'px';
            
            // Maintain selection
            const newRange = document.createRange();
            newRange.selectNodeContents(selectedElement);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            return { success: true, message: `Font size reset to original ${originalSize}px` };
          } else {
            // If no modified span found, check if selection contains modified spans
            const spans = range.cloneContents().querySelectorAll('span[data-original-font-size]');
            if (spans.length > 0) {
              // Reset all modified spans in the selection
              const allSpans = document.querySelectorAll('span[data-original-font-size]');
              let resetCount = 0;
              
              allSpans.forEach(span => {
                if (selection.containsNode(span, true)) {
                  const originalSize = parseFloat(span.dataset.originalFontSize);
                  span.style.fontSize = originalSize + 'px';
                  resetCount++;
                }
              });
              
              return { success: true, message: `Reset ${resetCount} modified text elements` };
            } else {
              return { success: false, message: "No modified text found in selection" };
            }
          }
        } catch (error) {
          return { success: false, message: `Error: ${error.message}` };
        }
      }
    });
    // Reset slider UI back to 100%
    if (fontSlider && fontSliderValue) {
      fontSlider.value = '100';
      fontSliderValue.textContent = '100%';
    }
  } catch (e) {
    console.error('Font size reset error:', e);
  }
});

// Slider: set font size relative to original using a percentage factor
if (fontSlider && fontSliderValue) {
  fontSlider.addEventListener('input', async (e) => {
    const value = parseInt(e.target.value, 10) || 100;
    fontSliderValue.textContent = value + '%';
    const factor = Math.max(0.1, value / 100);

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (factor) => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0 || selection.getRangeAt(0).collapsed) {
            return { success: false, message: 'No text selected' };
          }
          try {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
              ? range.commonAncestorContainer.parentNode
              : range.commonAncestorContainer;

            const ensurePxNumber = (v) => {
              const n = parseFloat(v);
              return Number.isFinite(n) ? n : 16;
            };

            let span;
            if (container.tagName === 'SPAN' && container.dataset.originalFontSize) {
              span = container;
              const original = ensurePxNumber(span.dataset.originalFontSize);
              const newSize = Math.max(8, original * factor);
              span.style.fontSize = newSize + 'px';

              const newRange = document.createRange();
              newRange.selectNodeContents(span);
              selection.removeAllRanges();
              selection.addRange(newRange);
              return { success: true, message: `Set to ${Math.round(factor*100)}% of original (${original}px)` };
            } else {
              const tempEl = container;
              const original = ensurePxNumber(getComputedStyle(tempEl).fontSize);
              const newSize = Math.max(8, original * factor);

              span = document.createElement('span');
              span.style.fontSize = newSize + 'px';
              span.style.fontWeight = 'inherit';
              span.style.color = 'inherit';
              span.dataset.originalFontSize = String(original);

              const contents = range.extractContents();
              span.appendChild(contents);
              range.insertNode(span);

              const newRange = document.createRange();
              newRange.selectNodeContents(span);
              selection.removeAllRanges();
              selection.addRange(newRange);

              return { success: true, message: `Wrapped selection at ${Math.round(factor*100)}% (orig ${original}px)` };
            }
          } catch (err) {
            return { success: false, message: 'Error: ' + err.message };
          }
        },
        args: [factor]
      });
    } catch (err) {
      console.error('Slider apply error:', err);
    }
  });
}
