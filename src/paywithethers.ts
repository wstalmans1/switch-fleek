import { ethers } from "ethers";

declare global {interface Window {ethereum: any}}

export async function payWithEthers(walletAddress: string, recipientAddress: string, amount: string) {
  if (!walletAddress) {
    console.log("Wallet not connected");
    return;
  }

  try {
    // Create a provider and get the signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Convert the amount to wei
    const value = ethers.parseUnits(amount, "ether");

    // Send the transaction
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: value,
    });

    console.log('Transaction sent:', tx.hash);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}
