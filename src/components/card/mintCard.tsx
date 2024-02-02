import { getBeanMetaData, getUserNfts } from "../../service/nftService";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { mint } from "../../service/mintService";

function MintCard() {
  const [tokenId, setTokenId] = useState(NaN);
  const [imageUrl, setImageUrl] = useState(
    "https://i.seadn.io/s/raw/files/d0541b6eb9d935724e3118b62d145dc9.gif?auto=format&dpr=1&w=1000"
  );
  const [loading, setLoading] = useState(false);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      console.log(address);
      // @ts-ignore
      getUserNfts(address).then((res) => {
        console.log(res);
      });
    }
  });

  useEffect(() => {
    if (!isNaN(tokenId)) {
      setLoading(true);
    }
    if (isNaN(tokenId)) {
      setImageUrl(
        "https://i.seadn.io/s/raw/files/d0541b6eb9d935724e3118b62d145dc9.gif?auto=format&dpr=1&w=1000"
      );
    } else {
      getBeanMetaData(tokenId).then((res) => {
        setImageUrl(res);
      });
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [tokenId]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src="/beanz-types-U536IATcwzVjQAsZ.png" alt="Album" />
      </figure>
      <div className="card-body bg-white text-black">
        <h2 className="card-title">Mint your Azuki Bean !!!</h2>
        <p>Input the token id you want.</p>
        {loading ? (
          <div className="w-40 h-40 mx-auto flex mb-8">
            <span className="loading loading-ring loading-lg mx-auto items-center text-blue-700 font-bold"></span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`${tokenId}`}
            className="w-40 h-40 rounded-lg mx-auto mb-8"
          />
        )}
        <div className="card-actions justify-end">
          <input
            type="number"
            placeholder="token id"
            className="input input-bordered input-success w-full max-w-xs bg-white"
            value={tokenId}
            onChange={(e) => setTokenId(parseInt(e.target.value))}
          />

          <button
            className="btn btn-primary w-full cursor-pointer"
            onClick={() => {
              // @ts-ignore
              mint(address, tokenId);
            }}
          >
            MINT
          </button>
        </div>
      </div>
    </div>
  );
}

export default MintCard;
