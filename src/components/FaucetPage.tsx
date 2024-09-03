"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export default function FaucetPage({
  setNetwork,
  network,
}: {
  setNetwork: any;
  network: any;
}) {
  const wallet = useWallet();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const sendAirdropToUser = async () => {
    if(!wallet.publicKey && !address) return;
    setLoading(true);
    let public_key = "";
    
    if(wallet.publicKey){
      public_key = wallet.publicKey.toString();
    }else{
      public_key = address;
    }

    try {
      const url = "https://jetpack-web3-wallet-backend.onrender.com/wallet/airdrop-sol";
      const response = await axios.post(url, {public_key, amount});
      if(response?.status === 200){
        toast.success("Success", {
          description: `Successfully airdropped ${amount} SOL.`,
          duration: 1500,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong!",
        duration: 1500,
      });
    }
    setLoading(false);
  }
  
  return (
    <>
      <Card className="w-full max-w-md absolute z-20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sol Faucet
          </CardTitle>
          <CardDescription className="text-center">
            Airdrop sol to your wallet on devnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <WalletMultiButton />
              {wallet?.publicKey ? null : <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your wallet address"
                  value={address}
                  disabled={loading}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  min={0}
                  max={1}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="network">Network</Label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger id="network">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={WalletAdapterNetwork.Devnet}>
                      Devnet
                    </SelectItem>
                    {/* <SelectItem value={WalletAdapterNetwork.Testnet}>
                      Testnet
                    </SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="button" onClick={sendAirdropToUser} disabled={loading || parseFloat(`${amount}`) > 1 || parseFloat(`${amount}`) <= 0 || !amount}>
            Request Tokens
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
