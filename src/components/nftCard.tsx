import { BiIdCard } from "react-icons/bi";
import { useAccount } from "wagmi";
import { shortenHexString } from "../utils";
import { setApproval, createOrder } from "../service/market";

export default function NftCard(props: any) {
  const handleSaleClick = async () => {
    if (document) {
      (document.getElementById(props.imageUrl) as HTMLFormElement).showModal();
    }
  };

  const { address } = useAccount();
  

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
            <button className="btn btn-success w-full mt-4" onClick={()=>{
              setApproval(props.tokenId, props.contractAddress)
              createOrder(props.contractAddress, props.tokenId, 30000, address as `0x${string}`, props.imageUrl, props.name)
            }}>CONFIRM</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
