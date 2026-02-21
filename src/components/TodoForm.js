// Bu dosya yeni görev ekleme formunu render eder — input alanı ve "+" butonu içerir.

import { useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import { showToast } from "@/lib/toast";

export default function TodoForm({ darkMode }) {
  // Lokal state: sadece bu input'un değerini tutar
  const [title, setTitle] = useState("");
  // Global aksiyon: store'a yeni görev ekler
  const addTodo = useTodoStore((state) => state.addTodo);

  // Form gönderildiğinde çalışır (Enter veya buton tıklaması)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş görev göndermeyi engelle — uyarı toastı göster
    if (!title.trim()) {
      showToast.error("Hiçbir görev eklemediniz!");
      return;
    }

    await addTodo(title.trim());
    setTitle(""); // Input'u temizle
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full max-w-3xl mx-auto px-4 mb-6"
    >
      {/* Görev başlığı input'u */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bir sonraki görevini yaz"
        className={`flex-1 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#f5c155] transition-all border ${
          darkMode
            ? "bg-neutral-800/60 backdrop-blur-sm text-stone-200 placeholder-stone-500 border-white/10"
            : "bg-white/60 backdrop-blur-sm text-neutral-800 placeholder-neutral-400 border-black/10"
        }`}
      />

      {/* Ekleme butonu — SVG daireli + ikonu */}
      <button
        type="submit"
        className="group cursor-pointer outline-none shrink-0"
        data-tooltip="Görev ekle"
      >
        <svg
          className="stroke-[#f5c155] fill-none group-hover:fill-[#f5c155]/30 group-active:stroke-[#f5d580] group-active:fill-[#f5c155]/50 group-active:duration-0 duration-300"
          viewBox="0 0 24 24"
          height="44px"
          width="44px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
          <path strokeWidth="1.5" d="M8 12H16" />
          <path strokeWidth="1.5" d="M12 16V8" />
        </svg>
      </button>
    </form>
  );
}
