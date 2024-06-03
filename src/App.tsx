import "./App.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (window.ethereum) {
      // Listen fo account changes
      const handleAccountsChanged = (accounts: string[]) => {
        setWalletAddress(accounts[0]);
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup function to remove the listener when then component unmounts
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
