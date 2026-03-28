import { z } from "zod";

export const userIdSchema = z.string().min(1, "userId gereklidir").max(100);

// Sadece string, en az 1 karakter, maksimum 255 karakter
export const titleSchema = z.string().min(1, "Görev başlığı boş olamaz").max(255, "Görev başlığı çok uzun");

export const createTodoSchema = z.object({
  title: titleSchema,
  userId: userIdSchema,
});

export const updateTodoSchema = z.object({
  title: titleSchema.optional(),
  completed: z.boolean().optional(),
});
