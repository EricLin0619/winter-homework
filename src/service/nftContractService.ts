import { writeContract, prepareWriteContract } from '@wagmi/core'
import BeanABI from "../abi/BeanABI.json"

const SepoliaChainId = 11155111

const BeanAddress = "0x6c8fD7F46261115919E3968a9e42057a9941F413" 

export async function mint (ownerAddress: string, tokenId: number) {
    const config = await prepareWriteContract({
        address: BeanAddress, 
        abi: BeanABI,
        chainId: SepoliaChainId,
        functionName: 'mint',
        args: [
          ownerAddress,
          tokenId
        ],
      })
    const result = await writeContract(config)
    return result
}

export async function transferNftToOriginal(_contractAddress: string, _ownerAddress: string, _toAddress: string, _tokenId: number) {
  const config = await prepareWriteContract({
    address: _contractAddress as `0x${string}`, 
    abi: BeanABI,
    chainId: SepoliaChainId,
    functionName: 'transferFrom',
    args: [
      _ownerAddress,
      _toAddress,
      _tokenId
    ],
  })
await writeContract(config)
}

export async function drawNft() {
  const config = await prepareWriteContract({
    address: BeanAddress as `0x${string}`, 
    abi: BeanABI,
    chainId: SepoliaChainId,
    functionName: 'draw',
  })
await writeContract(config)
}