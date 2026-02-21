// Bu dosya tüm görevleri liste halinde render eder — her görev için TodoItem bileşenini çağırır.

import useTodoStore from "@/store/useTodoStore";
import TodoItem from "@/components/TodoItem";

export default function TodoList({ darkMode }) {
  const todos = useTodoStore((state) => state.todos);
  const loading = useTodoStore((state) => state.loading);

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 text-center py-8">
        <p className={darkMode ? "text-stone-500" : "text-neutral-400"}>
          Görevler yükleniyor...
        </p>
      </div>
    );
  }

  // Görev yoksa bilgilendirme mesajı
  if (todos.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 text-center py-12">
        <div className="flex flex-col items-center gap-3">
          {/* Boş kutu ikonu */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-16 h-16 ${darkMode ? "text-stone-700" : "text-neutral-300"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <p className={`text-lg font-medium ${darkMode ? "text-stone-400" : "text-neutral-500"}`}>
            Henüz görev yok
          </p>
          <p className={`text-sm ${darkMode ? "text-stone-600" : "text-neutral-400"}`}>
            Yukarıdaki alandan ilk görevini ekleyerek başla!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto px-4 pb-8">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} darkMode={darkMode} />
      ))}
    </div>
  );
}
