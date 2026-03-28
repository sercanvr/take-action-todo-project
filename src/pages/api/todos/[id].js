import prisma from "@/lib/prisma";
import { sanitizeTitle } from "@/lib/sanitize";
import { updateTodoSchema, userIdSchema } from "@/lib/validation";

export default async function handler(req, res) {
  const { id, userId } = req.query;

  if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).json({ message: "Geçersiz görev ID formatı." });
  }

  const parsedUserId = userIdSchema.safeParse(userId);
  if (!parsedUserId.success) {
    return res.status(400).json({ message: parsedUserId.error.errors[0].message });
  }

  if (req.method === "PUT") {
    try {
      const parsedBody = updateTodoSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: parsedBody.error.errors[0].message });
      }

      const { title, completed } = parsedBody.data;

      const todo = await prisma.todo.findUnique({ where: { id } });
      if (!todo) return res.status(404).json({ message: "Gorev bulunamadi." });
      if (todo.userId !== parsedUserId.data) return res.status(403).json({ message: "Yetkisiz islem." });

      const data = {};
      if (title !== undefined) {
        const sanitizedTitle = sanitizeTitle(title);
        if (sanitizedTitle) data.title = sanitizedTitle;
      }
      if (completed !== undefined) data.completed = completed;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Guncellenecek alan yok." });
      }

      const updatedTodo = await prisma.todo.update({ where: { id }, data });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Görev güncellenemedi." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const todo = await prisma.todo.findUnique({ where: { id } });
      if (!todo) return res.status(404).json({ message: "Gorev bulunamadi." });
      if (todo.userId !== parsedUserId.data) return res.status(403).json({ message: "Yetkisiz islem." });

      await prisma.todo.delete({ where: { id } });
      return res.status(200).json({ message: "Gorev silindi." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gorev silinemedi." });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ message: req.method + " desteklenmiyor." });
}
