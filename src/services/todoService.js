// Bu dosya API uç noktalarına yapılan tüm fetch isteklerini merkezi bir yerden yönetir (servis katmanı).

const API_URL = "/api/todos";

// ── Tüm görevleri getir ──
export async function fetchTodos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Görevler yüklenirken bir hata oluştu.");
  }

  return response.json();
}

// ── Yeni görev ekle ──
export async function createTodo(title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Görev eklenirken bir hata oluştu.");
  }

  return response.json();
}

// ── Görevi güncelle (başlık veya tamamlanma durumu) ──
export async function updateTodo(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Görev güncellenirken bir hata oluştu.");
  }

  return response.json();
}

// ── Görevi sil ──
export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Görev silinirken bir hata oluştu.");
  }

  return response.json();
}