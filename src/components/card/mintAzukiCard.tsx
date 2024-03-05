import { getBeanMetaData, getUserNfts } from "../../service/nftService";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { mint } from "../../service/nftContractService";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { Network, Alchemy } from "alchemy-sdk";

const AlchemySettings = {
  apiKey: "aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(AlchemySettings);


function MintAzukiCard(props: any) {
  const [tokenId, setTokenId] = useState(NaN);
  const [imageUrl, setImageUrl] = useState(
    "https://i.seadn.io/s/raw/files/d0541b6eb9d935724e3118b62d145dc9.gif?auto=format&dpr=1&w=1000"
  );
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const { address } = useAccount();

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
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [tokenId]);

  function setRandomTokenId() {
    setTokenId(Math.floor(Math.random() * 19951));
  }

  useEffect(() => {
    console.log("txHash: ",txHash)
    if (txHash) {
      alchemy.transact.waitForTransaction(txHash)
    }
  },[txHash])

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src="/Azuki.jpg" alt="Album" />
      </figure>
      <div className="card-body bg-white text-black">
        <h2 className="card-title">Mint your Azuki</h2>
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
          <div className="flex items-center">
            <input
              type="number"
              placeholder="token id"
              className="input input-bordered input-success w-full max-w-xs bg-white"
              value={tokenId}
              onChange={(e) => setTokenId(parseInt(e.target.value))}
            />
            <GiPerspectiveDiceSixFacesRandom className="w-12 h-12 cursor-pointer" onClick={setRandomTokenId}/>
          </div>

          <button
            className="btn btn-primary w-full cursor-pointer"
            onClick={async () => {
              // @ts-ignore
              const txResult = await mint(address, tokenId);
              setTxHash(txResult.hash)
            }}
          >
            MINT
          </button>
          {/* <MintButton ownerAddress={address as `0x`} tokenId={tokenId} /> */}
        </div>
      </div>
    </div>
  );
}

export default MintAzukiCard;
