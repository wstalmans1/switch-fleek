import "./App.css";
import { useMetaMask } from "./useMetaMask";

function App() {
  
  const { walletAddress, isMobile, requestAccount } = useMetaMask();

  return (
    <main>
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
        <h2>Wallet Address: {walletAddress} </h2>
      </div>
    </main>
  );
}
export default App;
