import { writeContract, prepareWriteContract, readContract} from '@wagmi/core'
import BeanABI from "../abi/BeanABI.json"
import MarketABI from "../abi/MarketABI.json"
import { BytesLike, ethers } from "ethers"

const marketContractAddress = "0x3475e2495bBF6a383569cc34381e8e5E55285C41"
const SepoliaChainId = 11155111
const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org')
const signer = new ethers.Wallet('fc4392110802477c76c21b771ce1528f8a3efc3fd902a1e33ec95f459d2c6943', provider)
const marketContract = new ethers.Contract(marketContractAddress, MarketABI, signer)


export async function setApproval (_tokenId: number, _ERC721Address: string) {
    const config = await prepareWriteContract({
        address: _ERC721Address as `0x${string}`,
        abi: BeanABI,
        chainId: SepoliaChainId,
        functionName: 'approve',
        args: [
          "0x3475e2495bBF6a383569cc34381e8e5E55285C41",
          _tokenId
        ],
      })
      await writeContract(config)
}

export async function getBlockNumber() {
    console.log(typeof(process.env.PRIVATE_KEY))
}

export async function createOrder(_ERC721Address: string, _tokenId: number, _price: number, _ownerAddress: string) {
  const data = await marketContract.createOrder(_ERC721Address, _tokenId, _price, _ownerAddress)
  console.log(data)
}