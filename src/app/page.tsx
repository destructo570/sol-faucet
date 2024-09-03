"use client";

import { useState, useMemo } from "react";
import {
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import FaucetPage from "@/components/FaucetPage";

import "@solana/wallet-adapter-react-ui/styles.css";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);
  
  const endpoint = useMemo(() => "https://solana-devnet.g.alchemy.com/v2/WVOYbh1FGXEOLqPFeN8F6DtddIZmi6fP", []);

  return (
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center p-4">
            <FaucetPage setNetwork={setNetwork} network={network}/>
            <BackgroundBeams/>
          </div>
        </WalletModalProvider>
      </WalletProvider>
  );
}
