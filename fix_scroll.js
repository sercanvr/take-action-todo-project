const fs = require('fs');
let content = fs.readFileSync('src/styles/globals.css', 'utf8');

content = content.replace("  overflow-y: scroll; /* Scrollbar çýktýðýnda ekranýn sola kaymasýný engeller */\n", "");
content = content.replace("  scrollbar-gutter: stable; /* Modern tarayýcýlarda kaymayý önlemek için ekstra alan ayýrýr */\n", "");

if (!content.includes("@media (hover: hover) and (pointer: fine)")) {
  content += "\n/* Masaüstü (Fiziksel Scrollbar'a Sahip) Cihazlar Ýçin Kayma Engeli */\n@media (hover: hover) and (pointer: fine) {\n  body {\n    overflow-y: scroll;\n    scrollbar-gutter: stable;\n  }\n}\n";
}

fs.writeFileSync('src/styles/globals.css', content);
