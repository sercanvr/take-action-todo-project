// Bu dosya uygulamanın üst navigasyon çubuğunu (logo + başlık + tema) render eder.

import Image from "next/image";

export default function Header({ darkMode, setDarkMode }) {
  // Logoya tıklanınca sayfayı yenile
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between w-full max-w-3xl mx-auto py-6 px-4">
      {/* Sol: Logo görseli + Başlık — tıklanınca sayfa yenilenir */}
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-1.5 select-none cursor-pointer hover:opacity-80"
      >
        <Image
          src="/ta-logo.png"
          alt="Take Action Logo"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <h1 className="text-xl font-extrabold tracking-wide">
          <span className={darkMode ? "text-stone-300" : "text-neutral-700"}>TAKE ACTION </span>
          <span className="text-[#f5c155]">TODO</span>
        </h1>
      </div>

      {/* Sağ: Light/Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-lg cursor-pointer transition-colors ${
          darkMode
            ? "text-stone-400 hover:text-[#f5c155] hover:bg-neutral-800"
            : "text-neutral-600 hover:text-[#f5c155] hover:bg-neutral-200"
        }`}
        data-tooltip-pos="bottom"
        data-tooltip={darkMode ? "Açık temaya geç" : "Koyu temaya geç"}
      >
        {darkMode ? (
          // Güneş ikonu — light mode'a geç
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          // Ay ikonu — dark mode'a geç
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>
    </header>
  );
}
