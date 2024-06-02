import "./App.css";
//import { ethers } from 'ethers';

function App() {
  async function requestAccount() {
    // Check if Metamask exists
    if(window.ethereum) {
      console.log('Metamask detected');

      try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      console.log('Metamask not detected');
    }
  }

  return (
    <main>
      <div>
        <button onClick={requestAccount}>Connect MetaMask</button>
        <h2>Wallet Address:</h2>
      </div>
    </main>
  );
}
export default App;
