import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";

export default function CheckBalance() {
  const [loading, setLoading] = useState(false);
  const [balanceMessage, setBalanceMessage] = useState("");
  const publicKey = new PublicKey("7TesgdXUJvejf3jwKyNNBAG9c8YqjvDYNyt7pQ8ziBmy");
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const getBalance = async () => {
    setLoading(true);
    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      setBalanceMessage(
        `💰 The balance for the wallet at address ${publicKey} is<br/><span style="font-size: 24px; font-weight: bold; color: #6200ff;">${balanceInSOL} SOL!</span>`
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
    <div>
      <button onClick={getBalance} disabled={loading} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Check Your Balance {balanceMessage && (
        <p dangerouslySetInnerHTML={{ __html: balanceMessage }} />
      )}
      </button>
    </div>
  );
}
