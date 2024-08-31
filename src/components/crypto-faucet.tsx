'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CryptoFaucet() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [network, setNetwork] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ address, amount, network })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute left-[calc(50%-4rem)] top-10 h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%-18rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
          <path fill="rgba(255,255,255,0.05)" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
          <defs>
            <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Crypto Faucet</CardTitle>
          <CardDescription className="text-center">Get test tokens for your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="network">Network</Label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger id="network">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="devnet">Devnet</SelectItem>
                    <SelectItem value="testnet">Testnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Request Tokens</Button>
        </CardFooter>
      </Card>
    </div>
  )
}