import { mint } from "../../service/mintService";

function Mint() {
  return (
    <>
      <button className="btn btn-success" onClick={mint}>MINT</button>
    </>
  );
}

export default Mint;
