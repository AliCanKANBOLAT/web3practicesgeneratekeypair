import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL  } from "@solana/web3.js";
import { useState } from "react";


export default function RequestAirDrop() {
  
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const airDropRequest = async () => {
      if(publicKey) {
        setLoading(true); 
        try {
          const signature = await connection.requestAirdrop(publicKey, 10 * LAMPORTS_PER_SOL)
          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
          await connection.confirmTransaction({signature, blockhash, lastValidBlockHeight} )
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false);
  }
  return(
    <button onClick={airDropRequest} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" >
    {loading ? "progress..." : "RequestAirDrop"}
    </button>
  )
}