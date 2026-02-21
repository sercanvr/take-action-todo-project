// Bu dosya sayfanın en altında sabit duran telif hakkı (copyright) footer bileşenini render eder.

export default function Footer({ darkMode }) {
  // Yıl dinamik — her yıl başında otomatik güncellenir
  const year = new Date().getFullYear();

  return (
    <footer
      className={`w-full py-10 mt-auto text-center text-sm ${
        darkMode ? "text-stone-600" : "text-neutral-400"
      }`}
    >
      © {year} Take Action TODO. Tüm Hakları Saklıdır.
    </footer>
  );
}
