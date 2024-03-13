import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_API_KEY = "aBu-p16T4anm-L9FhpHw1NMh1ZdP_k98";
const SEPOLIA_PRIVATE_KEY = "fc4392110802477c76c21b771ce1528f8a3efc3fd902a1e33ec95f459d2c6943";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia:'7PEXZCJFU6EM9WW5CQM4752SBXNQ7W1WXS'
    }
  }
};

export default config;
