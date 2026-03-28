// XSS koruması için DOMPurify ile string sanitization
import DOMPurify from "isomorphic-dompurify";

/**
 * Görev başlığını zararlı HTML/script injection'larından temizle
 * @param {string} title - Temizlenecek başlık
 * @returns {string} Temizlenmiş başlık
 */
export function sanitizeTitle(title) {
  if (!title || typeof title !== "string") return "";

  // DOMPurify ile temizle (sadece text, HTML'ye izin verme)
  const clean = DOMPurify.sanitize(title, {
    ALLOWED_TAGS: [], // Hiçbir tag'a izin verme
    ALLOWED_ATTR: [], // Hiçbir attribute'a izin verme
    KEEP_CONTENT: true, // İçeriği koru, tag'ları sil
  });

  // Trim ve boşluk kontrolü
  return clean.trim();
}

/**
 * Gelen input'ları güvenli şekilde işle
 * @param {object} obj - Temizlenecek object (API body)
 * @returns {object} Temizlenmiş object
 */
export function sanitizeInput(obj) {
  if (!obj || typeof obj !== "object") return {};

  const sanitized = {};

  if (obj.title && typeof obj.title === "string") {
    sanitized.title = sanitizeTitle(obj.title);
  }

  if (typeof obj.completed === "boolean") {
    sanitized.completed = obj.completed;
  }

  return sanitized;
}
