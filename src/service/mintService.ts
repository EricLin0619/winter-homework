import { writeContract, prepareWriteContract } from '@wagmi/core'
import BeanABI from "../abi/BeanABI.json"

const SepoliaChainId = 11155111

const BeanAddress = "0x30126127819966e599E2d489D0bCb6a8797F7bF8" 

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
    await writeContract(config)
}