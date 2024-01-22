import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ParticleNetwork } from "@particle-network/auth";
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  goerli,
  sepolia,
} from "wagmi/chains";
import { particleWallet } from "@particle-network/rainbowkit-ext";

const projectId = "d9711726-29d4-4693-b8b3-ba7d97a6ad43"
const clientKey = "cBiUsHpenqGTyxX9vcwcZv7tPPk7KBlyM7cBynV5"
const appId = "a0d294a7-1650-4e86-aab3-8f2ad5240628"
const walletConnectId = "055f7ae519cd5ad3a4857375ef773ec1"

new ParticleNetwork({
  projectId: projectId as string,
  clientKey: clientKey as string,
  appId: appId as string,
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, sepolia, polygon, optimism, arbitrum],
  [publicProvider()]
);

const particleWallets = [
  particleWallet({ chains, authType: "google" }),
  particleWallet({ chains, authType: "facebook" }),
  particleWallet({ chains, authType: "apple" }),
];

const popularWallets = {
  groupName: "Popular",
  wallets: [
    ...particleWallets,
    injectedWallet({ chains }),
    rainbowWallet({
      chains,
      projectId: walletConnectId as string,
    }),
    coinbaseWallet({ appName: "RainbowKit demo", chains }),
    metaMaskWallet({
      chains,
      projectId: walletConnectId as string,
    }),
  ],
};

const connectors = connectorsForWallets([
  popularWallets,
  // {
  //     groupName: 'Other',
  //     wallets: [
  //         argentWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
  //         trustWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
  //         omniWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
  //         imTokenWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
  //         ledgerWallet({ chains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
  //     ],
  // },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function WagmiProvider(props: any) {
  return (
    <>
      {config && (
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}

export default WagmiProvider;
