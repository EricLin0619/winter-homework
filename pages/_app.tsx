import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import WagmiProvider from "../src/wagmiProvider";
import Navbar from "../src/components/navbar";
 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="mx-10 mt-6">
      <WagmiProvider>
        <Navbar />
        <Component {...pageProps} />
      </WagmiProvider>
    </main>
  );
}

export default MyApp;
