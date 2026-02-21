// Bu dosya Zustand ile global state yönetimini sağlar; tüm CRUD aksiyonları burada tanımlıdır.

import { create } from "zustand";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todoService";
import { showToast } from "@/lib/toast";

const useTodoStore = create((set, get) => ({
  // ── State ──
  todos: [],
  loading: false,

  // ── Tüm görevleri yükle ──
  loadTodos: async () => {
    set({ loading: true });
    try {
      const todos = await fetchTodos();
      set({ todos });
    } catch (error) {
      showToast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  // ── Yeni görev ekle ──
  addTodo: async (title) => {
    try {
      const newTodo = await createTodo(title);
      // Mevcut listeye en başa ekle (en yeni üstte)
      set((state) => ({ todos: [newTodo, ...state.todos] }));
      showToast.success("Görev başarıyla eklendi!");
    } catch (error) {
      showToast.error(error.message);
    }
  },

  // ── Görev tamamlanma durumunu değiştir ──
  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
      if (updatedTodo.completed) {
        showToast.success("Görev tamamlandı!");
      } else {
        showToast.info("Görev tekrar açıldı.");
      }
    } catch (error) {
      showToast.error(error.message);
    }
  },

  // ── Görev başlığını düzenle ──
  editTodo: async (id, newTitle) => {
    try {
      const updatedTodo = await updateTodo(id, { title: newTitle });
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
      showToast.success("Görev güncellendi!");
    } catch (error) {
      showToast.error(error.message);
    }
  },

  // ── Görevi sil ──
  removeTodo: async (id) => {
    try {
      await deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
      showToast.info("Görev silindi!");
    } catch (error) {
      showToast.error(error.message);
    }
  },
}));

export default useTodoStore;
