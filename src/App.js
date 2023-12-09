import React from "react";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useDisconnect,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";

const PROJECT_ID = "461a5c215e7994c3281f94e8b71e4426";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId: PROJECT_ID,
});

const App = () => {
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  async function onClickWalletConnect() {
    open();
  }

  async function getSigner() {
    if (!isConnected) {
      return console.log("user is not connected");
    }
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("address", address);
  }

  async function onDisconnect() {
    if (!isConnected) {
      return console.log("user is not connected");
    }
    disconnect();
  }

  return (
    <div>
      <button onClick={onClickWalletConnect}>Connect Wallet Connect</button>
      <button onClick={getSigner}>Get Signer</button>
      <button onClick={onDisconnect}>Disconnect</button>
    </div>
  );
};

export default App;
