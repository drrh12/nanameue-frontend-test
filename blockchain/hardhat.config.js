require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const PRIVATE_KEY = process.env.PRIVATE_KEY || "";


module.exports = {
  solidity: "0.8.28",
  networks: {
    // Polygon Amoy testnet
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [PRIVATE_KEY],
      chainId: 80002,
      gasPrice: 35000000000
    },
    // Polygon Mainnet
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY],
      chainId: 137,
      gasPrice: 30000000000
    }
  },
  // For verification on Polygonscan
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || ""
    }
  }
};
