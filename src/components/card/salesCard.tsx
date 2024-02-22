function SalesCard() {
  return (
    <div className="card card-compact bg-base-100 shadow-xl col-span-1 mx-5 mt-4 mb-8">
      {/* https://ipfs.io/ipfs/QmTRuWHr7bpqscUWFmhXndzf5AdQqkekhqwgbyJCqKMHrL/1.png */}
      <figure>
        <img
          src="https://ipfs.io/ipfs/QmTRuWHr7bpqscUWFmhXndzf5AdQqkekhqwgbyJCqKMHrL/1.png"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Bean #1</h2>
        <div className="flex items-center">
          <span className="text-lg inline">Price: 0.509 ETH</span>
          <span className="inline">$1,172.08</span>
        </div>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
}

export default SalesCard;
