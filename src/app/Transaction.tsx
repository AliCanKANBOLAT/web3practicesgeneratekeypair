import { useState, FormEvent } from "react";
import { Transaction, SystemProgram, PublicKey, Connection, LAMPORTS_PER_SOL, Keypair, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from 'bs58';

const SendSolTransaction: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [senderSecretKey, setSenderSecretKey] = useState<string>("");
  const [recipientPubkey, setRecipientPubkey] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [transactionMessage, setTransactionMessage] = useState<string>("");

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const sendToken = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert the sender's secret key from base58 using bs58 library
      const senderKeypair = Keypair.fromSecretKey(bs58.decode(senderSecretKey));
      const recipient = new PublicKey(recipientPubkey);
      const transaction = new Transaction();

      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * amount,
      });

      transaction.add(sendSolInstruction);

      // Sign and send the transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]
      );

      console.log("Transaction signature:", signature);

      setTransactionMessage(`${amount} SOL sent successfully! Transaction signature: ${signature}`);
      setTimeout(() => {
        setTransactionMessage("");
        setShowInput(false);
      }, 5000); // 5 seconds

      // Reset input fields after submission (optional)
      setSenderSecretKey("");
      setRecipientPubkey("");
      setAmount(0);
    } catch (error) {
      console.error("Error sending SOL:", error);
      setTransactionMessage("Error sending SOL. Please try again.");
      setTimeout(() => {
        setTransactionMessage("");
        setShowInput(false);
      }, 5000); // 5 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowInput(!showInput)}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 me-2 mb-2"
      >
        Send SOL Wallet to Wallet
      </button>
      {showInput && (
        <form onSubmit={sendToken}>
          <input
            type="text"
            value={senderSecretKey}
            onChange={(e) => setSenderSecretKey(e.target.value)}
            placeholder="Enter Sender Secret Key"
            className="mb-3 p-2 border border-gray-300 rounded  text-gray-700"
            required
          />
          <input
            type="text"
            value={recipientPubkey}
            onChange={(e) => setRecipientPubkey(e.target.value)}
            placeholder="Enter Recipient Public Key"
            className="mb-3 p-2 border border-gray-300 rounded text-gray-700"
            required
          />
          <input
  type="number"
  value={amount === 0 ? '' : amount}
  onChange={(e) => setAmount(parseFloat(e.target.value))}
  placeholder={amount === 0 ? 'Enter Amount of SOL' : ''}
  className="mb-3 p-2 border border-gray-300 rounded  text-gray-700"
  required
/>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {loading ? "Loading..." : "Send SOL"}
          </button>
        </form>
      )}
      {transactionMessage && (
        <div>
          {transactionMessage}
        </div>
      )}
    </>
  );
};

export default SendSolTransaction;
