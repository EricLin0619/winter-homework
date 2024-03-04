import MintAzukiCard from "../src/components/card/mintAzukiCard";
import MintALert from "../src/components/alert/mintSuccess";
import { useState } from "react";

function Page() {
  const [alert, setAlert] = useState(false);
  return (
    <section>
      <MintALert alert={alert} />
      <div className="w-2/3 mx-auto mt-24">
        <MintAzukiCard setAlert={setAlert}/>
      </div>
    </section>
  );
}

export default Page;
