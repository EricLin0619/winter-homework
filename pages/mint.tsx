import MintCard from "../src/components/card/mintCard";
import MintALert from "../src/components/alert/mintSuccess";
import { useState } from "react";

function Page() {
  const [alert, setAlert] = useState(false);
  return (
    <section>
      <MintALert alert={alert} />
      <div className="w-2/3 mx-auto mt-24">
        <MintCard setAlert={setAlert}/>
      </div>
    </section>
  );
}

export default Page;
