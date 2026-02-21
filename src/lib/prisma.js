// Bu dosya Prisma veritabanı bağlantısını tekil (singleton) olarak yönetir, gereksiz bağlantı sızıntısını önler.

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Geliştirme ortamında hot-reload her seferinde yeni PrismaClient oluşturmasın diye
  // global nesneye kaydediyoruz.
  if (!global._prismaClient) {
    global._prismaClient = new PrismaClient();
  }
  prisma = global._prismaClient;
}

export default prisma;