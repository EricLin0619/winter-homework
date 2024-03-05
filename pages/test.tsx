import TransferNftButton from "../src/components/button/transferNftButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function Page() {
  
  const { address: userAddress } = useAccount();
  useEffect(() => {
    axios.get(`http://localhost:3001/order/${userAddress}`).then((res) => {
      console.log(res.data)
    })
  })
  return (
    <section className="mt-10">
      <TransferNftButton />
    </section>
  );
}

export default Page;
