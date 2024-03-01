import { BiIdCard } from "react-icons/bi";
import { shortenHexString } from "../../utils";

export default function NftCard(props: {
  contractAddress: string,
  tokenId: number,
  imageUrl: string
  price: number,
  sellerAddress: string,
  tokenName: string
}) {
  

  const handleSaleClick = async () => {
    if (document) {
      (document.getElementById("123") as HTMLFormElement).showModal();
    }
  };

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
              BUY NFT
            </span>
          </div>
        </div>
      </div>
      <dialog id="123" className="modal">
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
            <p className="ml-auto">{props.price}</p>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-success w-full mt-4">Buy</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
