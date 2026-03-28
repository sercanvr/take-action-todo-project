import prisma from "@/lib/prisma";
import { sanitizeTitle } from "@/lib/sanitize";
import { createTodoSchema, userIdSchema } from "@/lib/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const parsedQuery = userIdSchema.safeParse(req.query.userId);
      if (!parsedQuery.success) {
        return res.status(400).json({ message: parsedQuery.error.errors[0].message });
      }

      const userId = parsedQuery.data;
      const todos = await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });
      return res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gorevler getirilemedi." }); 
    }
  }

  if (req.method === "POST") {
    try {
      const parsedBody = createTodoSchema.safeParse(req.body);
      if (!parsedBody.success) {
         return res.status(400).json({ message: parsedBody.error.errors[0].message });
      }

      const { title, userId } = parsedBody.data;
      const sanitizedTitle = sanitizeTitle(title);

      if (!sanitizedTitle) {
        return res.status(400).json({ message: "Gorev basligi bos olamaz." });
      }

      const newTodo = await prisma.todo.create({
        data: {
          title: sanitizedTitle,
          userId,
        },
      });

      return res.status(201).json(newTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gorev eklenemedi." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: req.method + " metodu desteklenmiyor." });
}
