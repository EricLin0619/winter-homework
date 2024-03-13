import { writeContract, prepareWriteContract, readContract } from "@wagmi/core";
import BeanABI from "../abi/BeanABI.json";
import MarketABI from "../abi/MarketABI.json";
import { ethers } from "ethers";
import axios from "axios";

const marketContractAddress = "0x4223e8ABc01cDd72a3d9b3ddC617dfD733271e02";
const SepoliaChainId = 11155111;
const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org");
const signer = new ethers.Wallet(
  "fc4392110802477c76c21b771ce1528f8a3efc3fd902a1e33ec95f459d2c6943",
  provider
);
const marketContract = new ethers.Contract(
  marketContractAddress,
  MarketABI,
  signer
);

export async function setApproval(_tokenId: number, _ERC721Address: string) {
  const config = await prepareWriteContract({
    address: _ERC721Address as `0x${string}`,
    abi: BeanABI,
    chainId: SepoliaChainId,
    functionName: "approve",
    args: [marketContractAddress, _tokenId],
  });
  const result = await writeContract(config);
  return result.hash
}

export async function createOrder(
  _ERC721Address: string,
  _tokenId: string,
  _price: number,
  _ownerAddress: string,
  _imgaeUrl: string,
  _name: string
) {
  const priceInWei = BigInt(_price * 10 ** 18)
  const data = await marketContract.createOrder(_ERC721Address, _tokenId, priceInWei, _ownerAddress)
  await axios.post("http://localhost:3001/order", {
    contractAddress: _ERC721Address,
    tokenId: parseInt(_tokenId),
    price: _price,
    sellerAddress: _ownerAddress,
    imageUrl: _imgaeUrl,
    name: _name,
  });
  console.log(data)
}

export async function buyNft(_contractAddress: string, _tokenId: number, _price: number) {
  const config = await prepareWriteContract({
    address: marketContractAddress as `0x${string}`,
    abi: MarketABI,
    chainId: SepoliaChainId,
    functionName: "purchase",
    value: BigInt(_price * 10 ** 18),
    args: [
      _contractAddress,
      _tokenId,
    ],
  });
  const result = await writeContract(config);
  return result.hash
}
