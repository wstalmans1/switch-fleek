import "./App.css";
import { useState } from "react";
import { useMetaMask } from "./useMetaMask";
import { payWithMetamask } from "./paywithmetamask";
import { payWithEthers } from "./paywithethers";

function App() {

  const { walletAddress, requestAccount } = useMetaMask();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handlePayWithMetamask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress && recipientAddress && amount) {
      await payWithMetamask(walletAddress, recipientAddress, amount);
      setRecipientAddress("");
      setAmount("");
    }
  };

  const handlePayWithEthers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress && recipientAddress && amount) {
      await payWithEthers(walletAddress, recipientAddress, amount);
      setRecipientAddress("");
      setAmount("");
    }
  };

  return (
    <main>
      <div>
          <button className="button-ConnectMetamask" onClick={requestAccount}>Connect MetaMask</button>
          <h3>Active Wallet Address: <br />
           {walletAddress} </h3>
          <div className="payWithMetamask">
            <h3>Send payment with MetaMask</h3>
            <form onSubmit={handlePayWithMetamask}>
                <div>
                  <input className = "input-box" type="text" placeholder="Recipient Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
                  <input className = "input-box" type="number" placeholder="Amount (ETH)" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>  
              <button type="submit">Pay with MetaMask</button>
            </form>
          </div>
          <div className="payWithEthers">
            <h3>Send payment with Ethers.js</h3>
            <form onSubmit={handlePayWithEthers}>
                <div>
                  <input className = "input-box" type="text" placeholder="Recipient Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
                  <input className = "input-box" type="number" placeholder="Amount (ETH)" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>  
              <button type="submit">Pay with Ethers.js</button>
            </form>
          </div>          
      </div>
    </main>
  );
}
export default App;
