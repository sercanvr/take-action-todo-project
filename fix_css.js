const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

content = content.replace(/fill: none !important;\\n  stroke: currentColor !important;/g, 'fill: none !important;\n  stroke: currentColor !important;');

fs.writeFileSync('src/styles/globals.css', content);
