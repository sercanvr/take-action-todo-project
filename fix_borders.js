const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

content = content.replace(/border: 2px solid  !important;/g, 'border: 2px solid transparent !important;'); // Just as a temp replace

// Put borders back
content = content.replace(/\[data-sonner-toast\]\[data-type="success"\] \{\s*border: [^\}]+\}/, '[data-sonner-toast][data-type="success"] {\n  border: 2px solid #10b981 !important;\n}');
content = content.replace(/\[data-sonner-toast\]\[data-type="error"\] \{\s*border: [^\}]+\}/, '[data-sonner-toast][data-type="error"] {\n  border: 2px solid #ef4444 !important;\n}');
content = content.replace(/\[data-sonner-toast\]\[data-type="warning"\] \{\s*border: [^\}]+\}/, '[data-sonner-toast][data-type="warning"] {\n  border: 2px solid #f59e0b !important;\n}');
content = content.replace(/\[data-sonner-toast\]\[data-type="info"\] \{\s*border: [^\}]+\}/, '[data-sonner-toast][data-type="info"] {\n  border: 2px solid #3b82f6 !important;\n}');

fs.writeFileSync('src/styles/globals.css', content);
