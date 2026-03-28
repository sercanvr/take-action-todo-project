// Bu dosya tüm sayfalara ortak sarmalayan (wrapper) bileşendir — global stil ve toast bildirimleri burada yüklenir.

import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster 
        position="bottom-center" 
        duration={4000}
        closeButton 
        toastOptions={{
          classNames: {
            closeButton: 'my-toast-close-btn',
            toast: 'my-modern-toast',
          },
        }}
      />
    </>
  );
}