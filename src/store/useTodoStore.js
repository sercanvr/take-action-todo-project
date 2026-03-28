import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/services/todoService";
import { showToast } from "@/lib/toast";

const CACHE_KEY = "takeaction_todos_cache";
const USER_ID_KEY = "takeaction_user_id";

function getFromCache() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]"); } catch (e) { return []; }
}
function saveToCache(todos) {
  if (typeof window !== "undefined") {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(todos)); } catch (e) {}
  }
}
function clearCacheLocal() {
  if (typeof window !== "undefined") {
    try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
  }
}
function getOrCreateUserId() {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) { id = uuidv4(); localStorage.setItem(USER_ID_KEY, id); }
    return id;
  } catch (e) { return uuidv4(); }
}

const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  loadTodos: async () => {
    set({ loading: true });
    try {
      const userId = getOrCreateUserId();
      const cached = getFromCache();
      if (cached.length > 0) set({ todos: cached });
      const todos = await fetchTodos(userId);
      set({ todos });
      saveToCache(todos);
    } catch (error) {
      showToast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title) => {
    const userId = getOrCreateUserId();
    const tempId = uuidv4();
    const optimisticTodo = { id: tempId, title, completed: false, createdAt: new Date().toISOString(), userId };

    const previousTodos = get().todos;
    const nextTodos = [...previousTodos, optimisticTodo];
    set({ todos: nextTodos });
    saveToCache(nextTodos);

    try {
      const newTodo = await createTodo(title, userId);
      set((state) => {
        const updated = state.todos.map((t) => (t.id === tempId ? newTodo : t));
        saveToCache(updated);
        return { todos: updated };
      });
      showToast.success("Görev başarıyla eklendi!");
    } catch (error) {
      set({ todos: previousTodos });
      saveToCache(previousTodos);
      showToast.error("Görev eklenemedi: " + error.message);
    }
  },

  toggleTodo: async (id) => {
    const previousTodos = get().todos;
    const todo = previousTodos.find((t) => t.id === id);
    if (!todo) return;

    const nextTodos = previousTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    set({ todos: nextTodos });
    saveToCache(nextTodos);

    try {
      const userId = getOrCreateUserId();
      const updatedTodo = await updateTodo(id, { completed: !todo.completed }, userId);
      set((state) => {
        const updated = state.todos.map((t) => (t.id === id ? updatedTodo : t));
        saveToCache(updated);
        return { todos: updated };
      });
      if (!todo.completed) {
        showToast.success("Görev tamamlandı!");
      } else {
        showToast.info("Görev tekrar aktif edildi!");
      }
    } catch (error) {
      set({ todos: previousTodos });
      saveToCache(previousTodos);
      showToast.error("Görev güncellenemedi: " + error.message);
    }
  },

  editTodo: async (id, newTitle) => {
    const previousTodos = get().todos;
    const nextTodos = previousTodos.map((t) => (t.id === id ? { ...t, title: newTitle } : t));
    set({ todos: nextTodos });
    saveToCache(nextTodos);

    try {
      const userId = getOrCreateUserId();
      const updatedTodo = await updateTodo(id, { title: newTitle }, userId);
      set((state) => {
         const updated = state.todos.map((t) => (t.id === id ? updatedTodo : t));
         saveToCache(updated);
         return { todos: updated };
      });
      showToast.warn("Görev güncellendi!");
    } catch (error) {
      set({ todos: previousTodos });
      saveToCache(previousTodos);
      showToast.error("Görev düzenlenemedi: " + error.message);
    }
  },

  removeTodo: async (id) => {
    const previousTodos = get().todos;
    const nextTodos = previousTodos.filter((t) => t.id !== id);
    set({ todos: nextTodos });
    saveToCache(nextTodos);

    try {
      const userId = getOrCreateUserId();
      await deleteTodo(id, userId);
      showToast.info("Görev silindi!");
    } catch (error) {
      set({ todos: previousTodos });
      saveToCache(previousTodos);
      showToast.error("Görev silinemedi: " + error.message);
    }
  },

  clearCache: () => {
    clearCacheLocal();
    set({ todos: [] });
  },
}));

export default useTodoStore;
