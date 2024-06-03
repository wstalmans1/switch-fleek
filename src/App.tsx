import "./App.css";
import { useState, useEffect } from "react";
//import { ethers } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile environment
  useEffect(() => {
    // Check if the user is on a mobile device
    const userAgent = navigator.userAgent;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    setIsMobile(isMobileDevice);
  }, []);

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
        {isMobile && (
          <a href="http://metamask.app.link/dapp/some-air-hissing.on-fleek.app/" target="_blank" rel="noopener noreferrer">Open MetaMask</a>
        )}
        <h2>Wallet Address: {walletAddress} </h2>
      </div>
    </main>
  );
}
export default App;
