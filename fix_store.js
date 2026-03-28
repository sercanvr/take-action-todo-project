const fs = require('fs');
let content = fs.readFileSync('src/store/useTodoStore.js', 'utf8');

// Replacements
content = content.replace(/"Gorev basariyla eklendi!"/g, '"Görev baþarýyla eklendi!"');
content = content.replace(/"Eklenemedi: "/g, '"Görev eklenemedi: "');
content = content.replace(/"Guncellenemedi: "/g, '"Görev güncellenemedi: "');
content = content.replace(/"Gorev guncellendi!"/g, '"Görev güncellendi!"');
content = content.replace(/"Duzenlenemedi: "/g, '"Görev düzenlenemedi: "');
content = content.replace(/"Gorev silindi!"/g, '"Görev silindi!"');
content = content.replace(/"Silinemedi: "/g, '"Görev silinemedi: "');

content = content.replace(/showToast\.success\("Görev güncellendi!"\);/g, 'showToast.warn("Görev güncellendi!");');

const toggleOld = '        return { todos: updated };\\r?\\n      }\\);\\r?\\n    } catch \\(error\\) {';
const toggleRegex = new RegExp(toggleOld, 'g');

const toggleNew = \        return { todos: updated };
      });
      showToast.success(!todo.completed ? "Görev tamamlandý!" : "Görev durumu deðiþtirildi!");
    } catch (error) {\;
content = content.replace(toggleRegex, toggleNew);

fs.writeFileSync('src/store/useTodoStore.js', content);
