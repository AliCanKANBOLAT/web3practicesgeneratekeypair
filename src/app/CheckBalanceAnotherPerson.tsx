import { useState, FormEvent } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const CheckAnotherBalance: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [balanceMessage, setBalanceMessage] = useState<string>("");
  const [publicKeyInput, setPublicKeyInput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showBalanceMessage, setShowBalanceMessage] = useState<boolean>(false);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const getBalance = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const publicKey = new PublicKey(publicKeyInput);
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
      setBalanceMessage(
        `💰 The balance for the wallet is ${balanceInSOL} SOL!`
      );
      setShowBalanceMessage(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalanceMessage("Error fetching balance. Please try again.");
      setShowBalanceMessage(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setBalanceMessage("");
        setShowBalanceMessage(false);
        setShowInput(false);
      }, 5000); // 5 seconds
    }
  };

  return (
    <>
      <button
        onClick={() => setShowInput(!showInput)}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 me-2 mb-2"
      >
        Check Another Balance
      </button>
      {showInput && (
        <form onSubmit={getBalance}>
          <input
            type="text"
            value={publicKeyInput}
            onChange={(e) => setPublicKeyInput(e.target.value)}
            placeholder="Enter Wallet Public Key"
            className="mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {loading ? "Loading..." : "See Balance"}
          </button>
        </form>
      )}
      {showBalanceMessage && (
        <div>
          {balanceMessage}
        </div>
      )}
    </>
  );
};

export default CheckAnotherBalance;
