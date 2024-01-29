import axios from "axios";

export async function getBeanMetaData(tokenId: number) {
  const url = `https://eth-mainnet.g.alchemy.com/nft/v3/aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98/getNFTMetadata?contractAddress=0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949&tokenId=${tokenId}&refreshCache=false`;
  const response = await axios.get(url);
//   axios
//     .get(url)
//     .then(function (response) {
//       //   console.log(response.data.image.originalUrl);
//       imageUrl = response.data.image.originalUrl;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

    return response.data.image.originalUrl;
}
