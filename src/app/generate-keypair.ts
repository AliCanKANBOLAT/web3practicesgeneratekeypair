import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// import { Keypair } from "@solana/web3.js";
// const keypair = Keypair.generate();
// console.log(`✅ Generated keypair!`)

const keypair = getKeypairFromEnvironment("SECRET_KEY");

export default keypair;
