// Bu dosya tek bir görev satırını render eder — checkbox, başlık, düzenle ve sil butonlarını içerir.

import { useState } from "react";
import useTodoStore from "@/store/useTodoStore";

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
    if (!editTitle.trim()) return;
    if (editTitle.trim() !== todo.title) {
      await editTodo(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  // Enter tuşuyla kaydet, Escape ile iptal et
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
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
        className="shrink-0 cursor-pointer"
        data-tooltip={todo.completed ? "Tamamlanmadı olarak işaretle" : "Tamamlandı olarak işaretle"}
      >
        {todo.completed ? (
          // Tamamlanmış: Yeşil dolu daire
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        ) : (
          // Tamamlanmamış: Boş kırmızımsı çerçeve
          <span className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-400" />
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
              ? "text-stone-400 hover:text-[#f5c155]"
              : "text-neutral-400 hover:text-[#f5c155]"
          }`}
          data-tooltip="Düzenle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}
