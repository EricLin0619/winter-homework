import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect } from "react";
import abi from "../../abi/BeanABI.json";
import { Network, Alchemy } from "alchemy-sdk";



function MintButton(props: { ownerAddress: string; tokenId: number }) {
  const { data, write, isSuccess, isLoading } = useContractWrite({
    address: "0x30126127819966e599E2d489D0bCb6a8797F7bF8",
    abi: abi,
    chainId: 11155111,
    functionName: "mint",
    args: [props.ownerAddress, props.tokenId],
  });


  useEffect(() => {
    if (isSuccess) {
      console.log("minted");
      console.log(data?.hash)
    }
    if (isLoading) {
      console.log("loading");
      console.log(data?.hash)
    }
  }, [isSuccess, isLoading]);

  return (
    <button
      className="btn btn-success"
      onClick={() => {
        write();
      }}
    >
      mint
    </button>
  );
}

export default MintButton;
