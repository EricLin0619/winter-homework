import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import FlashText from "../flashText";

function Navbar() {
  const router = useRouter();
  return (
    <div className="navbar bg-white text-black rounded-lg shadow-xl">
      <div className="flex-none dropdown">
        <button tabIndex={0} role="button" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 mt-5"
        >
          <li onClick={()=>{router.push("/mint")}}>
            <a>MINT</a>
          </li>
          <li onClick={()=>{router.push("/sales")}}>
            <a>SALES</a>
          </li>
          <li onClick={()=>{router.push("/test")}}>
            <a>TEST</a>
          </li>
        </ul>
      </div>
      <div className="flex-1" >
        <FlashText />
        {/* <a className="btn btn-ghost text-xl">NFT Market</a> */}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <ConnectButton />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
