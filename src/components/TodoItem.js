// Bu dosya tek bir görev satırını render eder — checkbox, başlık, düzenle ve sil butonlarını içerir.

import { useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import { Check, Edit2, Trash2 } from "lucide-react";

export default function TodoItem({ todo, darkMode }) {
  // Zustand aksiyonları
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  // Lokal state: inline düzenleme modu
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Düzenlemeyi kaydet
  const handleSave = async () => {
    if (!isEditing) return;
    setIsEditing(false); // Prevents duplicate calls

    const newLabel = editTitle.trim();
    if (!newLabel) {
      setEditTitle(todo.title);
      return;
    }
    if (newLabel !== todo.title) {
      await editTodo(todo.id, newLabel);
    }
  };

  // Enter tuşuyla kaydet, Escape ile iptal et
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 group transition-all ${
        darkMode
          ? "glass-dark shadow-sm"
          : "glass-light shadow-sm"
      }`}
      style={{ borderWidth: "1px", borderStyle: "solid" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245, 193, 85, 0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; }}
    >
      {/* Checkbox: Tamamlanma durumunu değiştir */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className="shrink-0 cursor-pointer group/check"
        data-tooltip={todo.completed ? "Tamamlanmadı olarak işaretle" : "Tamamlandı olarak işaretle"}
        data-tooltip-green
      >
        {todo.completed ? (
          // Tamamlanmış: Yeşil dolu daire
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500">
            <Check size={16} strokeWidth={2.5} className="text-white" />
          </span>
        ) : (
          // Tamamlanmamış: Boş kırmızımsı çerçeve (Hover'da yeşil olur)
          <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-400 group-hover/check:border-emerald-500 transition-colors" />
        )}
      </button>

      {/* Başlık: Normal mod veya düzenleme modu */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          className={`flex-1 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-[#f5c155] ${
            darkMode
              ? "bg-neutral-800 text-stone-200"
              : "bg-neutral-100 text-neutral-800"
          }`}
        />
      ) : (
        <span
          className={`flex-1 ${
            todo.completed
              ? "line-through text-stone-500"
              : darkMode
              ? "text-stone-200"
              : "text-neutral-800"
          }`}
          style={{ overflowWrap: "break-word", wordBreak: "break-word", minWidth: 0 }}
        >
          {todo.title}
        </span>
      )}

      {/* Aksiyon butonları: Düzenle ve Sil */}
      <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
        {/* Düzenle butonu */}
        <button
          onClick={() => {
            setEditTitle(todo.title);
            setIsEditing(true);
          }}
          className={`transition-colors cursor-pointer ${
            darkMode
              ? "text-stone-400 hover:text-blue-400"
              : "text-neutral-400 hover:text-blue-500"
          }`}
          data-tooltip="Düzenle"
          data-tooltip-blue
        >
          <Edit2 size={20} strokeWidth={1.5} />
        </button>

        {/* Sil butonu */}
        <button
          onClick={() => removeTodo(todo.id)}
          className={`transition-colors cursor-pointer ${
            darkMode
              ? "text-stone-400 hover:text-red-400"
              : "text-neutral-400 hover:text-red-500"
          }`}
          data-tooltip="Sil"
          data-tooltip-red
        >
          <Trash2 size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
