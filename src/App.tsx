import "./App.css";
import { useState } from "react";
import { useMetaMask } from "./useMetaMask";
import { sendPayment } from "./payment";

function App() {

  const { walletAddress, isMobile, requestAccount } = useMetaMask();
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSendPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress && recipientAddress && amount) {
      await sendPayment(walletAddress, recipientAddress, amount);
    }
  };

  return (
    <main>
      <div>
        <div>
          <button onClick={requestAccount}>Connect MetaMask</button>
          {isMobile && (
            <a
              href="http://metamask.app.link/dapp/some-air-hissing.on-fleek.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open MetaMask
            </a>
          )}
          <h2>Active Wallet Address: {walletAddress} </h2>
        </div>  
        <div>
          <h2>Send payment</h2>
          <form onSubmit={handleSendPayment}>
              <div>
                <input type="text" placeholder="Recipient Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
                <input type="number" placeholder="Amount (ETH)" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>  
            <button type="submit">Send Payment</button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default App;
