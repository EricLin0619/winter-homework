import { transferNftToOriginal } from "../../service/nftContractService";
import { useState } from "react";
import { useAccount } from "wagmi";

function TransferNftButton() {
  const [tokenId, setTokenId] = useState(0);
  const [to, setTo] = useState("");
  const [nftContract, setNftContract] = useState("");
  const { address } = useAccount();

  const handleButtonClick = async () => {
    if (document) {
      (document.getElementById("transferNft") as HTMLFormElement).showModal();
    }
  };
  return (
    <>
      <button className="btn btn-primary" onClick={handleButtonClick}>
        Transfer NFT
      </button>
      <dialog id="transferNft" className="modal">
        <div className="modal-box bg-white text-black p-10">
          <h3 className="font-bold text-lg text-center mb-2">
            Transfer your NFT
          </h3>
          <input
            type="text"
            placeholder="nft contract address"
            className="input input-bordered w-full  bg-white mt-4"
            onChange={(e) => {
                setNftContract(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="token Id"
            className="input input-bordered w-full  bg-white mt-4"
            onChange={(e) => {
              setTokenId(parseInt(e.target.value));
            }}
          />
          <input
            type="text"
            placeholder="to"
            className="input input-bordered w-full  bg-white mt-4"
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />
          
          <button
            className="btn btn-success w-full mt-4"
            onClick={() => {
              transferNftToOriginal(nftContract, address as '', to, tokenId);
            }}
          >
            transfer
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default TransferNftButton;
