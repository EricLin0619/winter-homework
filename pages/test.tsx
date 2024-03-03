import TransferNftButton from "../src/components/button/transferNftButton";
import axios from "axios";
import { useEffect, useState } from "react";

function Page() {
  
  useEffect(() => {
    axios.get("http://localhost:3001/order", {params: {address: "0xbB83a6e1AAE3C20930CDC695Ad971d632e578FC1"}}).then((res) => {
      console.log(res.data);
    })
  })
  return (
    <section className="mt-10">
      <TransferNftButton />
    </section>
  );
}

export default Page;
