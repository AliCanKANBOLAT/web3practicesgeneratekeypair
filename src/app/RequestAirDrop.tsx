//requestAirDrop.tsx
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export default function RequestAirDrop() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const airDropRequest = async () => {
    if (publicKey) {
      setLoading(true);
      setMessage(""); // Clear any previous message
      try {
        const signature = await connection.requestAirdrop(publicKey, 5 * LAMPORTS_PER_SOL);
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight });
        setMessage("Airdrop successful! Check your wallet balance.");
      } catch (error) {
        console.log(error);
        setMessage("Airdrop failed. Please try again.");
        // Clear the message after 5 seconds
        setTimeout(() => setMessage(""), 5000);
      }
      setLoading(false);
    } else {
      setMessage("Wallet not connected.");
      // Clear the message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={airDropRequest}
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        {loading ? "Requesting Airdrop..." : "Request Airdrop"}
      </button>
      {message && <p className="mt-2 text-sm text-white">{message}</p>}
    </div>
  );
}
