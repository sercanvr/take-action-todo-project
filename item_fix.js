const fs = require('fs');
let content = fs.readFileSync('src/components/TodoItem.js', 'utf8');

const oldSave = \// Düzenlemeyi kaydet
  const handleSave = async () => {
    if (!editTitle.trim()) return;
    if (editTitle.trim() !== todo.title) {
      await editTodo(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  // Enter tuþuyla kaydet, Escape ile iptal et
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };\;

const newSave = \// Düzenlemeyi kaydet
  const handleSave = async () => {
    if (!isEditing) return;
    setIsEditing(false); // input u kapat

    const newLabel = editTitle.trim();
    if (!newLabel) {
      setEditTitle(todo.title);
      return;
    }
    
    if (newLabel !== todo.title) {
      // Store daki stringi güncelle ve toast çýkar
      await editTodo(todo.id, newLabel);
    }
  };

  // Enter tuþuyla kaydet, Escape ile iptal et
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };\;

if(content.includes('// Düzenlemeyi kaydet')) {
    // Regex based replace to be safe against spaces
    const target = content.substring(content.indexOf('// Düzenlemeyi kaydet'), content.indexOf('return ('));
    content = content.replace(target, newSave + '\n\n  ');
    fs.writeFileSync('src/components/TodoItem.js', content);
    console.log('Fixed item_fix');
} else {
    console.log('No replacement');
}
