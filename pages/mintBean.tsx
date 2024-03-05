import MintBeanCard from "../src/components/card/mintBeanCard";
import MintALert from "../src/components/alert/mintSuccess";
import { useState } from "react";

function Page() {
  const [alert, setAlert] = useState(false);
  return (
    <section>
      <MintALert alert={alert} />
      <div className="w-2/3 mx-auto mt-24">
        <MintBeanCard setAlert={setAlert}/>
      </div>
    </section>
  );
}

export default Page;
