import { BiIdCard } from "react-icons/bi";
import { useAccount } from "wagmi";
import { shortenHexString } from "../../utils";
import { setApproval, createOrder } from "../../service/market";
import { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";

const AlchemySettings = {
  apiKey: "aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(AlchemySettings);

export default function NftCard(props: any) {
  // function
  const handleSaleClick = async () => {
    if (document) {
      (document.getElementById(props.imageUrl) as HTMLFormElement).showModal();
    }
  };

  // useState
  const { address } = useAccount();
  const [txHash, setTxHash] = useState("");

  // useEffect
  useEffect(() => {
    if (txHash) {
      alchemy.transact.waitForTransaction(txHash).then((res) => {
        if (res?.status === 1) {
          createOrder(
            props.contractAddress,
            props.tokenId,
            30000,
            address as `0x${string}`,
            props.imageUrl,
            props.name
          );
        }
      });
    }
  }, [txHash]);

  return (
    <>
      <div className="col-span-1 mx-5 mt-4 mb-8" onClick={handleSaleClick}>
        <div className="relative rounded-xl transition duration-430 hover:scale-105">
          <img
            className="aspect-square rounded-xl object-cover"
            src={props.imageUrl}
            alt="image description"
          />
          <div className="absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white/50 opacity-0 backdrop-blur-sm transition hover:opacity-100">
            <BiIdCard className="text-black rounded-xl w-10 h-auto" />
            <span className="font-mono text-black font-bold text-xl tracking-widest ntialiased">
              SALE NFT
            </span>
          </div>
        </div>
      </div>
      <dialog id={props.imageUrl} className="modal">
        <div className="modal-box bg-white text-black p-10">
          <h3 className="font-bold text-lg text-center mb-2">Sale your NFT</h3>
          <div className="flex">
            <p>Contract Address</p>
            <p className="ml-auto">{shortenHexString(props.contractAddress)}</p>
          </div>
          <div className="flex">
            <p>Token Id</p>
            <p className="ml-auto">{props.tokenId}</p>
          </div>
          <label className="input input-bordered flex items-center gap-2 bg-white mt-4">
            <input
              type="number"
              className="grow bg-white"
              placeholder="price you want to sell"
            />
            USD
          </label>
          <form method="dialog" className="modal-backdrop">
            <button
              className="btn btn-success w-full mt-4"
              onClick={async () => {
                const txHash = await setApproval(
                  props.tokenId,
                  props.contractAddress
                );
                setTxHash(txHash);
                // createOrder(
                //   props.contractAddress,
                //   props.tokenId,
                //   30000,
                //   address as `0x${string}`,
                //   props.imageUrl,
                //   props.name
                // );
              }}
            >
              CONFIRM
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
