function MintCard() {
  return (
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="/beanz-types-U536IATcwzVjQAsZ.png"
            alt="Album"
          />
        </figure>
        <div className="card-body bg-white text-black">
          <h2 className="card-title">Mint your Azuki Bean !!!</h2>
          <p>Input the token id you want.</p>
          <div className="card-actions justify-end">
          <input type="text" placeholder="token id" className="input input-bordered input-success w-full max-w-xs bg-white" />
            <button className="btn btn-primary w-full cursor-pointer">MINT</button>
          </div>
        </div>
      </div>
  );
}

export default MintCard;
