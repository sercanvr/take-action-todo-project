// Bu dosya tüm sayfalara ortak sarmalayan (wrapper) bileşendir — global stil ve toast bildirimleri burada yüklenir.

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}