"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css"
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import RequestAirDrop from "./RequestAirDrop";


export default function CreateWallet() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
    ],
    [network],
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ConnectionProvider {...{endpoint}}  >
        <WalletProvider {...{wallets}} autoConnect >
          <WalletModalProvider >
            <WalletMultiButton style={{marginBottom:30}} />
            <WalletDisconnectButton style={{marginBottom:30}} />
            <RequestAirDrop /> 
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
  );
}
