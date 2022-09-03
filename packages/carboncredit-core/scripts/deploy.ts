import { ethers } from 'hardhat';

async function main() {
    const CCNFT = await ethers.getContractFactory('CCNFT');
    const ccnft = await CCNFT.deploy();

    await ccnft.deployed();

    console.log('Deployed to ', ccnft.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
