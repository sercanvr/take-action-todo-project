import sanitizeHtml from 'sanitize-html';

export function sanitizeTitle(title) {
  if (!title || typeof title !== 'string') return '';

  const clean = sanitizeHtml(title, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return clean.trim();
}

export function sanitizeInput(obj) {
  if (!obj || typeof obj !== 'object') return {};

  const sanitized = {};

  if (obj.title && typeof obj.title === 'string') {
    sanitized.title = sanitizeTitle(obj.title);
  }

  if (typeof obj.completed === 'boolean') {
    sanitized.completed = obj.completed;
  }

  return sanitized;
}
