import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { getUserNfts } from "../../service/nftService";
import NftABI from "../../abi/BeanABI.json";

function ThrowAllNftButton() {
  const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
  const signer = new ethers.Wallet(
    "73a231b291a09f98d063f7a1445790271abc1530f31b44f3ad96752aa5f67f4e", // private key
    provider
  );

  const [nftContractAddress, setNftContractAddress] = useState("");
  const { address } = useAccount();

  const handleButtonClick = async () => {
    if (document) {
      (document.getElementById("throwNft") as HTMLFormElement).showModal();
    }
  };

  const handleThrowClick = async () => {
    const nftContract = new ethers.Contract(nftContractAddress, NftABI, signer);
    const nfts = await getUserNfts(address as `0x`);
    nfts.forEach(async (nft) => {
      if (nft.contractAddress === nftContractAddress) {
        await nftContract.transferFrom(
          address,
          nftContractAddress,
          nft.tokenId
        );
      }
    });
  };
  return (
    <>
      <button className="btn btn-warning" onClick={handleButtonClick}>
        Throw All NFT
      </button>
      <dialog id="throwNft" className="modal">
        <div className="modal-box bg-white text-black p-10">
          <h3 className="font-bold text-lg text-center mb-2">
            Throw All Your NFT
          </h3>
          <input
            type="text"
            placeholder="nft contract address"
            className="input input-bordered w-full  bg-white mt-4"
            onChange={(e) => setNftContractAddress(e.target.value)}
          />

          <button className="btn btn-success w-full mt-4" onClick={handleThrowClick}>throw</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ThrowAllNftButton;
