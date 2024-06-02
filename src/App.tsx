import "./App.css";
import { useState } from 'react';
//import { ethers } from 'ethers';

function App() {

  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    // Check if Metamask exists
    if (window.ethereum) {
      console.log("Metamask detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  return (
    <main>
      <div>
        <button onClick={requestAccount}>Connect MetaMask</button>
        <h2>Wallet Address: {walletAddress} </h2>
      </div>
    </main>
  );
}
export default App;
