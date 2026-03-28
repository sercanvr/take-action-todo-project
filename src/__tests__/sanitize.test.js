import { describe, it, expect } from 'vitest';
import { sanitizeTitle, sanitizeInput } from '../lib/sanitize';

describe('Sanitization Utilities', () => {
  describe('sanitizeTitle', () => {
    it('should return empty string for null, undefined, or non-string inputs', () => {
      expect(sanitizeTitle(null)).toBe('');
      expect(sanitizeTitle(undefined)).toBe('');
      expect(sanitizeTitle(123)).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeTitle('   Hello World   ')).toBe('Hello World');
    });

    it('should strip HTML tags and prevent XSS', () => {
      expect(sanitizeTitle('<script>alert("xss")</script>Task')).toBe('Task');
      expect(sanitizeTitle('<b>Bold</b> and <i>Italic</i>')).toBe('Bold and Italic');
    });
  });

  describe('sanitizeInput', () => {
    it('should return empty object for invalid inputs', () => {
      expect(sanitizeInput(null)).toEqual({});
      expect(sanitizeInput('string')).toEqual({});
    });

    it('should sanitize title and preserve boolean completed', () => {
      const input = {
        title: '<p>Learn Tests</p>',
        completed: true,
      };
      
      const expected = {
        title: 'Learn Tests',
        completed: true,
      };

      expect(sanitizeInput(input)).toEqual(expected);
    });
  });
});
