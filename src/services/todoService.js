// Bu dosya API uç noktalarına yapılan tüm fetch isteklerini merkezi bir yerden yönetir (servis katmanı).
// userId parametresi ile user isolation sağlanır

const API_URL = "/api/todos";

// ── Tüm görevleri getir ──
export async function fetchTodos(userId) {
  const response = await fetch(`${API_URL}?userId=${encodeURIComponent(userId)}`);

  if (!response.ok) {
    throw new Error("Görevler yüklenirken bir hata oluştu.");
  }

  return response.json();
}

// ── Yeni görev ekle ──
export async function createTodo(title, userId) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Görev eklenirken bir hata oluştu.");
  }

  return response.json();
}

// ── Görevi güncelle (başlık veya tamamlanma durumu) ──
export async function updateTodo(id, data, userId) {
  const response = await fetch(`${API_URL}/${id}?userId=${encodeURIComponent(userId)}`, {
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
export async function deleteTodo(id, userId) {
  const response = await fetch(`${API_URL}/${id}?userId=${encodeURIComponent(userId)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Görev silinirken bir hata oluştu.");
  }

  return response.json();
}