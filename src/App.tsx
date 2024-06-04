import "./App.css";
import { useState, useEffect } from "react";
import { useMetaMask } from "./useMetaMask";
import { payWithMetamask } from "./paywithmetamask";
import { payWithEthers } from "./paywithethers";
import { getTotalDeposits, rsvp, payBill, contractAddress } from "./contractUtils";

function App() {
  const { walletAddress, requestAccount } = useMetaMask();

  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<bigint | null>(null);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [venueAddress, setVenueAddress] = useState("");
  const [billAmount, setBillAmount] = useState("");

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

  async function fetchBalance() {
    try {
      const balanceValue: bigint = await getTotalDeposits();
      setBalance(balanceValue);
      console.log(balanceValue);
    } catch (error) {
      console.error("error fetching balance:", error);
    }
    //setLoading(false); // Stop loading after fetching
  }

  // RSVP trasnaction
  async function handleRSVP() {
    setTransactionHash(null);
    setLoading(true);
    try {
      const txHash = await rsvp();
      setTransactionHash(txHash);
      await fetchBalance(); //refresh balance after RSVP
    } catch (error) {
      if (error instanceof Error) {
        alert(`Transaction failed: ${error.message}`);
      } else {
        alert(`Transaction failed: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
    alert(`Transaction successful with hash: ${transactionHash}`);
  }

  // Pay Bill transaction
  async function handlePayBill() {
    if (!venueAddress || !billAmount) {
      alert("Please enter both venue address and bill amount");
      return;
    }
    setTransactionHash(null);
    setLoading(true);
    try {
      const txHash = await payBill(venueAddress, billAmount);
      setTransactionHash(txHash);
      await fetchBalance();
      alert(`Transaction successful with hash: ${txHash}`);
      // refresh balance after paying bill
    } catch (error) {
        if(error instanceof Error) {
          alert(`Transaction failed: ${error.message}`);
        } else {
          alert(`Transaction failed: ${String(error)}`);
        }    
    } finally {
      setLoading(false);
      setVenueAddress("");
      setBillAmount("");
    }
  }

  useEffect(() => {
    if(walletAddress) {
      fetchBalance();
    }
  }, [walletAddress]);

  return (
    <main>
      <div>
        <div>
          <button className="button-ConnectMetamask" onClick={requestAccount}>
            Connect Account From MetaMask
          </button>
          <h3>Active Wallet Address: <br />
          {walletAddress}{" "}</h3>
        </div>
        <div className="payWithMetamask">
          <h3>Send payment with MetaMask</h3>
          <form onSubmit={handlePayWithMetamask}>
            <div>
              <input className="input-box" type="text" placeholder="Recipient Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
              <input className="input-box" type="number" placeholder="Amount (ETH)" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="submit">Pay with MetaMask</button>
          </form>
        </div>
        <div className="payWithEthers">
          <h3>Send payment with Ethers.js</h3>
          <form onSubmit={handlePayWithEthers}>
            <div>
              <input className="input-box" type="text" placeholder="Recipient Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
              <input className="input-box" type="number" placeholder="Amount (ETH)" step="0.0001" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="submit">Pay with Ethers.js</button>
          </form>
        </div>
        <div>
          <p>Contract address: {contractAddress} </p>       
          <p>Contract Balance: {balance !== null ? balance.toString() : 'loading...'} </p>
          {loading && <p>Waiting for your transaction to be confirmed...</p>}
          <button onClick={handleRSVP}>Click to send 0.01 ETH to the partysplit contract</button>
          <p>Transaction Hash: {transactionHash} </p>
          <div>
            <h3>Pay Bill</h3>
            <input type="text" placeholder="Venue Address" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} />
            <input type="text" placeholder="Bill Amount" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
            <button onClick={handlePayBill} >Pay Bill</button>
          </div>
        </div>
      </div>
    </main>
  );
}
export default App;
