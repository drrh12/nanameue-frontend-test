const hre = require("hardhat");

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying TodoToken with account:", deployer.address);

  const todoToken = await ethers.deployContract("TodoToken", [deployer.address]);
  await todoToken.waitForDeployment();

  console.log("TodoToken deployed to:", await todoToken.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 