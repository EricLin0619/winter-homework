import { getUserNfts } from "../src/service/nftService";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import NftCard from "../src/components/card/nftCard";
import ForSaleCard from "../src/components/card/forSaleCard";
import axios from "axios";

function Page() {
  // useState
  const { address } = useAccount();
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

  // useEffect
  async function getNftData() {
    let forSaleContract = {}
    let forSaleTokenId = {}
    const res = await axios.get("http://localhost:3001/order", { params: { address: address } })
    setForSaleNfts(res.data);
    res.data.forEach((item: any) => {
      // @ts-ignore
      forSaleContract[item.contractAddress] = true;
      // @ts-ignore
      forSaleTokenId[item.tokenId] = true; 
    })
    setIsForSaleContract(forSaleContract);
    setIsForSaleTokenId(forSaleTokenId);

    const data = await getUserNfts(address as `0x`);
    setNfts(data);
  }

  useEffect(() => {
    getNftData();
  }, []);

  return (
    <div className="mt-8">
      <p className="text-3xl text-black font-bold">Your NFTs</p>
      <div className="grid grid-cols-4">
        {nfts.map((nft: any) => {
          // @ts-ignore
          if (isForSaleContract[nft.contractAddress] && isForSaleTokenId[nft.tokenId]) {
            console.log(
              "contract address: ",
              nft.contractAddress,
              "tokenId: ",
              nft.tokenId,
              "is for Sale. Skip it."
            );
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
      </div>
      <p className="text-3xl text-black font-bold">For Sale</p>
      <div className="grid grid-cols-4">
        {forSaleNfts.map((nft: any, index) => {
          return (
            <ForSaleCard
              contractAddress={nft.contractAddress}
              tokenId={nft.tokenId}
              imageUrl={nft.imageUrl}
              price={nft.price}
              sellerAddress={nft.Saleer_address}
              tokenName={nft.name}
              myKey={index.toString()}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Page;
