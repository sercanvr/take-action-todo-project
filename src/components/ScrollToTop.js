// Bu dosya sayfayı aşağı kaydırdığında sağ altta beliren "yukarı çık" butonunu render eder.

import { useState, useEffect, useCallback } from "react";

export default function ScrollToTop({ darkMode }) {
  const [visible, setVisible] = useState(false);

  // Scroll pozisyonunu kontrol eden fonksiyon
  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    // Anında gizle — scroll event'i beklemeden
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        width: "44px",
        height: "44px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#ffffff",
        backgroundColor: "#f5c155",
      }}
      className="rounded-xl flex items-center justify-center cursor-pointer text-white hover:opacity-90"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
