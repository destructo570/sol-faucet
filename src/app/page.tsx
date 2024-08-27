"use client";

import { useState, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import FaucetPage from "@/components/FaucetPage";

import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);
  
  const endpoint = useMemo(() => "https://solana-devnet.g.alchemy.com/v2/WVOYbh1FGXEOLqPFeN8F6DtddIZmi6fP", []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
            <FaucetPage setNetwork={setNetwork} network={network}/>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
