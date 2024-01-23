import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from "wagmi/chains";
import WagmiProvider from "../src/wagmiProvider";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./components/navbar";
import { walletEntryPlugin } from "@particle-network/wallet";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const projectId = "d9711726-29d4-4693-b8b3-ba7d97a6ad43";
const clientKey = "cBiUsHpenqGTyxX9vcwcZv7tPPk7KBlyM7cBynV5";
const appId = "a0d294a7-1650-4e86-aab3-8f2ad5240628";
walletEntryPlugin.init({
  projectId,
  clientKey,
  appId,
});

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
