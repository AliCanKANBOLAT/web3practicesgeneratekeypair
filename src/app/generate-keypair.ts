import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

export default keypair;
