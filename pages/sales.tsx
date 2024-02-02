import { getUserNfts } from "../src/service/nftService";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import NftCard from "../src/components/nftCard";

function Page() {
  const { isConnected, address } = useAccount();
  const [nfts, setNfts] = useState([{}]);
  useEffect(() => {
    // @ts-ignore
    getUserNfts(address).then((data) => {
      setNfts(data);
    });
  },[]);

  return (
    <div className="mt-8 grid grid-cols-4">
      {nfts.map((nft: any) => {
        return (
          <NftCard
            contractAddress={nft.contractAddress}
            tokenId={nft.tokenId}
            imageUrl={nft.imageUrl}
            name={nft.name}
          />
        );
      })}
    </div>
  );
}

export default Page;
