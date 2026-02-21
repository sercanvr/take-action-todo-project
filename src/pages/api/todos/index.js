// Bu dosya tüm görevleri listeleme (GET) ve yeni görev ekleme (POST) API uç noktasıdır.

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // ── GET: Tüm görevleri listele ──
  if (req.method === "GET") {
    try {
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(todos);
    } catch (error) {
      console.error("Görevler getirilirken hata:", error);
      return res.status(500).json({ message: "Görevler getirilemedi." });
    }
  }

  // ── POST: Yeni görev ekle ──
  if (req.method === "POST") {
    try {
      const { title } = req.body;

      // Boş başlık kontrolü
      if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Görev başlığı boş olamaz." });
      }

      const newTodo = await prisma.todo.create({
        data: { title: title.trim() },
      });

      return res.status(201).json(newTodo);
    } catch (error) {
      console.error("Görev eklenirken hata:", error);
      return res.status(500).json({ message: "Görev eklenemedi." });
    }
  }

  // ── Desteklenmeyen metot ──
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `${req.method} metodu desteklenmiyor.` });
}