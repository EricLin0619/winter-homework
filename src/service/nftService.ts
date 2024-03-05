import axios from "axios";
import { Network, Alchemy } from "alchemy-sdk";

const AlchemySettings = {
  apiKey: "aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(AlchemySettings);

export async function getBeanMetaData(tokenId: number) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v3/aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98/getNFTMetadata?contractAddress=0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949&tokenId=${tokenId}&refreshCache=false`;
  const response = await axios.get(url);
  return response.data.image.originalUrl;
}

export async function getUserNfts(userAddress: string) {
  const nftsForOwner = await alchemy.nft.getNftsForOwner(userAddress);
  const nfts = [];

  // Print contract address and tokenId for each NFT:
  for (const nft of nftsForOwner.ownedNfts) {
    const response = await alchemy.nft.getNftMetadata(
      nft.contract.address,
      nft.tokenId
    );
    nfts.push({
      contractAddress: response.contract.address,
      tokenId: response.tokenId,
      imageUrl: response.image.originalUrl,
      name: response.name,
    });
  }
  return nfts;
}
