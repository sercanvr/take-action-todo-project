const fs = require('fs');
let content = fs.readFileSync('src/pages/index.js', 'utf8');

if (!content.includes('document.body.className =')) {
  let toAdd = 
  useEffect(() => {
    document.body.className = darkMode ? "bg-neutral-950" : "bg-neutral-50";
  }, [darkMode]);
;
  content = content.replace("  }, [loadTodos]);", "  }, [loadTodos]);\n" + toAdd);
  fs.writeFileSync('src/pages/index.js', content);
  console.log('body sync added');
}
