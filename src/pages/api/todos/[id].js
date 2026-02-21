// Bu dosya tek bir görevi güncelleme (PUT) ve silme (DELETE) API uç noktasıdır.

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  // MongoDB ObjectID formatı kontrolü (24 haneli hex string)
  if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
    return res.status(400).json({ message: "Geçersiz görev ID formatı." });
  }

  // ── PUT: Görevi güncelle ──
  if (req.method === "PUT") {
    try {
      const { title, completed } = req.body;

      // Güncellenecek alanları dinamik olarak hazırla
      const data = {};
      if (title !== undefined) data.title = title.trim();
      if (completed !== undefined) data.completed = completed;

      // En az bir alan gönderilmiş mi kontrol et
      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Güncellenecek bir alan gönderilmedi." });
      }

      const updatedTodo = await prisma.todo.update({
        where: { id },
        data,
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      // Prisma: Kayıt bulunamadı hatası
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Görev bulunamadı." });
      }
      console.error("Görev güncellenirken hata:", error);
      return res.status(500).json({ message: "Görev güncellenemedi." });
    }
  }

  // ── DELETE: Görevi sil ──
  if (req.method === "DELETE") {
    try {
      await prisma.todo.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Görev başarıyla silindi." });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Görev bulunamadı." });
      }
      console.error("Görev silinirken hata:", error);
      return res.status(500).json({ message: "Görev silinemedi." });
    }
  }

  // ── Desteklenmeyen metot ──
  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).json({ message: `${req.method} metodu desteklenmiyor.` });
}