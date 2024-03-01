import type { NextPage } from "next";
import Head from "next/head";
import { walletEntryPlugin } from "@particle-network/wallet";
import SalesCard from "../src/components/card/salesCard";
import axios from "axios";
import { useEffect, useState } from "react";

const projectId = "d9711726-29d4-4693-b8b3-ba7d97a6ad43";
const clientKey = "cBiUsHpenqGTyxX9vcwcZv7tPPk7KBlyM7cBynV5";
const appId = "a0d294a7-1650-4e86-aab3-8f2ad5240628";
walletEntryPlugin.init({
  projectId,
  clientKey,
  appId,
});
walletEntryPlugin.walletEntryCreate();

const Home: NextPage = () => {
  const [orders, setOrders] = useState([
    {
      contractAddress: "",
      tokenId: 0,
      imageUrl: "",
      price: 0,
      seller_address: "",
      name: "",
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:3001/order").then((res) => {
      setOrders(res.data);
    });
  }, [orders]);

  return (
    <div>
      <Head>
        <title>NFT Market</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/bean.png" rel="icon" />
      </Head>
      <div className="mt-8 grid grid-cols-4">
        {orders.map((order, index) => {
          return (
            <SalesCard
              contractAddress={order.contractAddress}
              tokenId={order.tokenId}
              price={order.price}
              sellerAddress={order.seller_address}
              imageUrl={order.imageUrl}
              tokenName={order.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
