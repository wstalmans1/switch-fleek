import { ethers } from 'ethers';
import ContractABI from './contractABI.json';

export const contractAddress = '0xd34CF2A413c29B058Fd2634d170180cEF38A92Ec';

// The functions getWeb3Provider and getContract are not smart contract specific and can remain untouched
export async function getWeb3Provider() {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    throw new Error('Please download Metamask');
  }
}

export async function getContract(provider: ethers.BrowserProvider): Promise<ethers.Contract> {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, ContractABI, await signer);
}

export async function getTotalDeposits() {
    const provider = await getWeb3Provider();
    const contract = await getContract(provider);
    const totalDeposits = await contract.totalDeposits(); // call the totalDeposits function
    return ethers.parseUnits(totalDeposits, "ether"); // convert BigNumber to string in ether format
  }

export async function rsvp() {
  const provider = await getWeb3Provider();
  const contract = await getContract(provider); // Await the resolution of the promise
  const cost = await contract.cost(); // get the cost value from the contract
  const tx = await contract.rsvp({ value: cost }); // send the transaction with the value
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}

export async function payBill(venueAddress: any, billAmount: any) {
  const provider = await getWeb3Provider();
  const contract = await getContract(provider);
  //const billAmountInWei = ethers.utils.parseEther(billAmount); // Convert the bill amount to Wei
  const tx = await contract.payBill(venueAddress, billAmount); // send the transaction
  await tx.wait(); // wait for transaction confirmation
  return tx.hash; // return transaction hash
}