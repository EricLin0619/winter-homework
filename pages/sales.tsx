import { getUserNfts } from "../src/service/nftService";
import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import NftCard from "../src/components/card/nftCard";
import ForSaleCard from "../src/components/card/forSaleCard";
import Skeleton from "../src/components/others/skeleton";
import axios from "axios";

function Page() {
  // useState
  const { address: userAddress } = useAccount();
  const [nfts, setNfts] = useState([{}]);
  const [isForSaleContract, setIsForSaleContract] = useState({});
  const [isForSaleTokenId, setIsForSaleTokenId] = useState({});
  const [forSaleNfts, setForSaleNfts] = useState([
    {
      contractAddress: "",
      tokenId: 0,
      imageUrl: "",
      price: 0,
      Saleer_address: "",
      name: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // useEffect
  async function getNftData() {
    let forSaleContract = {}
    let forSaleTokenId = {}
    const res = await axios.get(`http://localhost:3001/order/${userAddress}`)
    console.log(res.data)
    setForSaleNfts(res.data);
    res.data.forEach((item: any) => {
      // @ts-ignore
      forSaleContract[item.contractAddress] = true;
      // @ts-ignore
      forSaleTokenId[item.tokenId] = true; 
    })
    setIsForSaleContract(forSaleContract);
    setIsForSaleTokenId(forSaleTokenId);

    const data = await getUserNfts(userAddress as `0x`);
    setNfts(data);
  }


  useEffect(() => {
    getNftData();
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <div className="mt-8">
      <div className="divider divider-start text-black ml-5 text-2xl font-bold">Your NFTs</div>
      <div className="grid grid-cols-4">
        {loading ? <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </> : nfts.map((nft: any) => {
          // @ts-ignore
          if (isForSaleContract[nft.contractAddress] && isForSaleTokenId[nft.tokenId]) {
            return null;
          } else {
            return (
              <NftCard
                contractAddress={nft.contractAddress}
                tokenId={nft.tokenId}
                imageUrl={nft.imageUrl}
                name={nft.name}
                key={nft.tokenId}
              />
            );
          }
        })}
        {/* {nfts.map((nft: any) => {
          // @ts-ignore
          if (isForSaleContract[nft.contractAddress] && isForSaleTokenId[nft.tokenId]) {
            return null;
          } else {
            return (
              <NftCard
                contractAddress={nft.contractAddress}
                tokenId={nft.tokenId}
                imageUrl={nft.imageUrl}
                name={nft.name}
                key={nft.tokenId}
              />
            );
          }
        })} */}
      </div>
      <div className="divider divider-start text-black ml-5 text-2xl font-bold">For Sale</div>
      <div className="grid grid-cols-4">
        {forSaleNfts.map((nft: any, index) => {
          return (
            <ForSaleCard
              contractAddress={nft.contractAddress}
              tokenId={nft.tokenId}
              imageUrl={nft.imageUrl}
              price={nft.price}
              sellerAddress={nft.seller_address}
              tokenName={nft.name}
              myKey={index.toString()}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
