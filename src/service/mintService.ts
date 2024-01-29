import { writeContract, prepareWriteContract } from '@wagmi/core'
import BeanABI from "../abi/BeanABI.json"

const SepoliaChainId = 11155111

const BeanAddress = "0x6A42F1082a3Ec9c5C00CC945bf0Fb6A12ef0c946" 

export async function mint () {
    const config = await prepareWriteContract({
        address: BeanAddress, 
        abi: BeanABI,
        chainId: SepoliaChainId,
        functionName: 'mint',
        args: [
          "0x5395B429e8c448aBA48Ba5c2527Fba8F3BfB0D3D",
          1
        ],
      })
    await writeContract(config)
}