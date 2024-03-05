import { BiIdCard } from "react-icons/bi";
import { shortenHexString } from "../../utils";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { buyNft } from "../../service/market";
import axios from "axios";
import { Network, Alchemy } from "alchemy-sdk";

const AlchemySettings = {
  apiKey: "aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(AlchemySettings);

export default function NftCard(props: {
  contractAddress: string;
  tokenId: number;
  imageUrl: string;
  price: number;
  sellerAddress: string;
  tokenName: string;
  myKey: string;
}) {
  // useState
  const [txHash, setTxHash] = useState("");
  const { address } = useAccount();

  //useEffect
  useEffect(() => {
    if (txHash) {
      alchemy.transact.waitForTransaction(txHash).then((res) => {
        if (res?.status === 1) {
          axios.delete("http://localhost:3001/order", {
            data: {
              contractAddress: props.contractAddress,
              tokenId: props.tokenId,
            },
          });
        }
      });
    }
  }, [txHash]);

  const handleSaleClick = async () => {
    if (document) {
      (document.getElementById(props.myKey) as HTMLFormElement).showModal();
    }
  };

  return (
    <div>
      <div className="col-span-1 mx-5 mt-4 mb-8" onClick={handleSaleClick}>
        <div className="relative rounded-xl transition duration-430 hover:scale-105">
          <img
            className="aspect-square rounded-xl object-cover"
            src={props.imageUrl}
            alt="image description"
          />
          <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white/50 opacity-0 backdrop-blur-sm transition hover:opacity-100">
            {/* <BiIdCard className="text-black rounded-xl w-10 h-auto" /> */}
            <img src="/nft2.png" className="w-10 h-10" />
            <span className="font-mono text-black font-bold text-xl tracking-widest ntialiased">
              BUY NFT
            </span>
          </div>
        </div>
      </div>
      <dialog id={props.myKey} className="modal">
        <div className="modal-box bg-white text-black p-10">
          <h3 className="font-bold text-lg text-center mb-2">Buy the NFT</h3>
          <div className="flex">
            <p>Contract Address</p>
            <p className="ml-auto">{shortenHexString(props.contractAddress)}</p>
          </div>
          <div className="flex">
            <p>Token Id</p>
            <p className="ml-auto">{props.tokenId}</p>
          </div>
          <div className="flex">
            <p>Name</p>
            <p className="ml-auto">{props.tokenName}</p>
          </div>
          <div className="flex">
            <p>Owner</p>
            <p className="ml-auto">{shortenHexString(props.sellerAddress)}</p>
          </div>
          <div className="flex">
            <p>Price</p>
            <p className="ml-auto">{props.price} <span className="font-bold">ETH</span></p>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button
              className="btn btn-success w-full mt-4"
              onClick={async () => {
                const txHash = await buyNft(
                  props.contractAddress,
                  props.tokenId,
                  props.price
                );
                setTxHash(txHash);
              }}
            >
              Buy
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
