// Bu dosya uygulamanın ana sayfasıdır — tüm bileşenleri bir araya getirir ve sayfa yüklendiğinde görevleri çeker.

import { useEffect, useState } from "react";
import Head from "next/head";
import useTodoStore from "@/store/useTodoStore";
import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

export default function Home() {
  const loadTodos = useTodoStore((state) => state.loadTodos);

  // Dark mode varsayılan olarak açık — F5 atınca sıfırlanır (localStorage kullanmıyoruz bilerek)
  const [darkMode, setDarkMode] = useState(true);

  // Sayfa ilk yüklendiğinde görevleri veritabanından çek
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <>
      <Head>
        <title>Take Action Todo | Harekete Geç, Hedefini Yakala!</title>
      </Head>
      <div
        className={`min-h-screen flex flex-col items-center transition-colors ${
          darkMode
            ? "bg-neutral-950 text-white"
            : "bg-neutral-50 text-neutral-900"
        }`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <ProgressCard darkMode={darkMode} />
        <TodoForm darkMode={darkMode} />
        <TodoList darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
      <ScrollToTop darkMode={darkMode} />
    </>
  );
}