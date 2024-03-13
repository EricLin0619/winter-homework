import { ethers } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory(
    "MyToken"
  );

  const instance = await ContractFactory.deploy(
    10066,
    "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
    "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c"
  );
  await instance.waitForDeployment();

  console.log(`Contract deployed to ${await instance.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
