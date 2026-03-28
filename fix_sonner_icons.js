const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

// Success
content = content.replace(
  /\[data-sonner-toast\]\[data-type="success"\] \[data-icon\] \{\s*background: #[a-f0-9]+ !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="success"] [data-icon] {\n  background: #10b981 !important;\n  color: #fff !important;\n}'
);
content = content.replace(
  /\[data-sonner-toast\]\[data-type="success"\] \[data-icon\] svg \{\s*fill: none !important;\s*stroke: currentColor !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="success"] [data-icon] svg {\n  fill: none !important;\n  stroke: currentColor !important;\n  color: #fff !important;\n}'
);

// Error
content = content.replace(
  /\[data-sonner-toast\]\[data-type="error"\] \[data-icon\] \{\s*background: #[a-f0-9]+ !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="error"] [data-icon] {\n  background: #ef4444 !important;\n  color: #fff !important;\n}'
);
content = content.replace(
  /\[data-sonner-toast\]\[data-type="error"\] \[data-icon\] svg \{\s*fill: none !important;\s*stroke: currentColor !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="error"] [data-icon] svg {\n  fill: none !important;\n  stroke: currentColor !important;\n  color: #fff !important;\n}'
);

// Warning
content = content.replace(
  /\[data-sonner-toast\]\[data-type="warning"\] \[data-icon\] \{\s*background: #[a-f0-9]+ !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="warning"] [data-icon] {\n  background: #f59e0b !important;\n  color: #fff !important;\n}'
);
content = content.replace(
  /\[data-sonner-toast\]\[data-type="warning"\] \[data-icon\] svg \{\s*fill: none !important;\s*stroke: currentColor !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="warning"] [data-icon] svg {\n  fill: none !important;\n  stroke: currentColor !important;\n  color: #fff !important;\n}'
);

// Info
content = content.replace(
  /\[data-sonner-toast\]\[data-type="info"\] \[data-icon\] \{\s*background: #[a-f0-9]+ !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="info"] [data-icon] {\n  background: #3b82f6 !important;\n  color: #fff !important;\n}'
);
content = content.replace(
  /\[data-sonner-toast\]\[data-type="info"\] \[data-icon\] svg \{\s*fill: none !important;\s*stroke: currentColor !important;\s*color: #[a-f0-9]+ !important;\s*\}/g,
  '[data-sonner-toast][data-type="info"] [data-icon] svg {\n  fill: none !important;\n  stroke: currentColor !important;\n  color: #fff !important;\n}'
);

// Close Button
content = content.replace(
  /background: transparent !important;\s*color: #9ca3af !important;/g,
  'background: #ef4444 !important;\n  color: #fff !important;'
);
content = content.replace(
  /\.my-toast-close-btn:hover \{\s*background: #f3f4f6 !important;\s*color: #111827 !important;\s*\}/g,
  '.my-toast-close-btn:hover {\n  background: #dc2626 !important;\n  color: #fff !important;\n}'
);

fs.writeFileSync('src/styles/globals.css', content);
console.log('done icons');
