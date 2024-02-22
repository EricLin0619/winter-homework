import { createOrder } from "../../service/market";

function TestButton() {
    const handleClick = async () => {
        await createOrder("0x3475e2495bBF6a383569cc34381e8e5E55285C41", 1, 100, "0xbB83a6e1AAE3C20930CDC695Ad971d632e578FC1")
    }
    return ( 
        <button className="btn btn-success" onClick={handleClick} > test </button>
     );
}

export default TestButton;