//checkyourbalance.tsx

import { useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function CheckBalance() {
  const [loading, setLoading] = useState(false);
  const [balanceMessage, setBalanceMessage] = useState("");
  const [balanceInSOL, setBalanceInSOL] = useState<number | null>(null); // State olarak balanceInSOL ekleniyor
  const publicKey = new PublicKey("7TesgdXUJvejf3jwKyNNBAG9c8YqjvDYNyt7pQ8ziBmy");
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const getBalance = async () => {
    setLoading(true);
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      setBalanceInSOL(balanceInSOL); // State olarak balanceInSOL güncelleniyor
      setBalanceMessage(
        `💰 The balance for the wallet at address ${publicKey.toBase58()} is ${balanceInSOL} SOL!`
      );
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalanceMessage("Error fetching balance. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setBalanceMessage("");
      }, 5000); // 5 seconds
    }
  };

  return (
    <>
      <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5" onClick={getBalance} 
      disabled={loading}>
        {(balanceMessage) ? "" : "Check Your Balance"} 
        <div>
        {balanceMessage && (
          <div>
            Balance at wallet adress: {publicKey.toBase58()} is <span style={{ fontSize: "24px", fontWeight: "bold", color: "#f854c7" }}>
            {balanceInSOL} SOL
            </span>
          </div>
        )}
      </div>
      </button>
      
    </>
  );
}
