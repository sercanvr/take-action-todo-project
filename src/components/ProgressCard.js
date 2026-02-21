// Bu dosya tamamlanan görev sayısını gösteren ilerleme kartını render eder — store'dan todos verisini okur.

import useTodoStore from "@/store/useTodoStore";

export default function ProgressCard({ darkMode }) {
  // Zustand store'undan sadece todos dizisini al
  const todos = useTodoStore((state) => state.todos);

  // Tamamlanan ve toplam görev sayısını hesapla
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-6">
      {/* Gradient kenarlıklı dış çerçeve */}
      <div
        style={{
          position: "relative",
          display: "flex",
          background: darkMode
            ? "linear-gradient(to bottom right, #7e7e7e, #363636, #363636, #363636, #363636)"
            : "linear-gradient(to bottom right, #f5c155, #c9c9c9, #c9c9c9, #c9c9c9, #c9c9c9)",
          borderRadius: "16px",
          padding: "1.5px",
          overflow: "hidden",
        }}
      >
        {/* Sol üst ışık parlaması efekti */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            background:
              "radial-gradient(ellipse at center, #ffffff, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0))",
            width: "30px",
            height: "30px",
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
        />

        {/* İç kart — eski içerik aynı kalıyor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.85)",
            borderRadius: "15px",
            width: "100%",
            padding: "28px 32px",
          }}
        >
          {/* Sol: Başlık ve motivasyon mesajı */}
          <div>
            <h2
              className={darkMode ? "text-stone-200" : "text-neutral-700"}
              style={{ fontFamily: '"Akaya Telivigala", system-ui', fontSize: "24px", fontWeight: "bold", margin: 0 }}
            >
              Tamamlanan Görev
            </h2>
            <p
              className={darkMode ? "text-stone-500" : "text-neutral-400"}
              style={{ fontFamily: '"Akaya Telivigala", system-ui', fontSize: "16px", margin: 0 }}
            >
              Böyle devam et!
            </p>
          </div>

          {/* Sağ: Köşeli kare kutu içinde sayaç */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              backgroundColor: darkMode ? "rgba(245,193,85,0.15)" : "rgba(245,193,85,0.2)",
              border: "2px solid #f5c155",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: '"Akaya Telivigala", system-ui',
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#f5c155",
                lineHeight: 1,
              }}
            >
              {completed}/{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
