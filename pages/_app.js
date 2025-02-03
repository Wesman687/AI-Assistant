import "@/styles/globals.css";
import ContextProvider from "@/context/context";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
