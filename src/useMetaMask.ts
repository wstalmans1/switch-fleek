import { useState, useEffect } from "react";

declare global {interface Window {ethereum: any}}

export function useMetaMask() {

  const [walletAddress, setWalletAddress] = useState<string>("");
  
  /*
  const [, setIsMobile] = useState<boolean>(false);

  // ****** Handle mobile environment ******
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    setIsMobile(isMobileDevice);
  }, []);
  */

  // ****** Get an account from MetaMask ******
  async function requestAccount() {
    if (window.ethereum) {
      console.log("Metamask detected");
      try {
        const accounts: string[] = await window.ethereum.request({method: "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
      } catch (error) {console.log("Error connecting...")}
    } else {console.log("Metamask not detected")}
  }

  // ****** Event listener: listen for account changes and reflect them in front-end ******
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => { setWalletAddress(accounts[0])};
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      // Cleanup function to remove the listener when then component unmounts
      return () => {window.ethereum.removeListener("accountsChanged", handleAccountsChanged)};
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return { walletAddress, requestAccount };
}
