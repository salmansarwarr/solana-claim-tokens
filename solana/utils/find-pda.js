const { PublicKey } = require("@solana/web3.js");

// replace with your program id
const programId = new PublicKey("E6xR4eE6BkYbxqPvhk1icTzmvY5ZCHwZYQQ4rwGpAejY");
const [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("meth")], // Seed(s) used to derive the PDA
    programId                // The program's ID
);

console.log("PDA:", pda.toBase58());
console.log("Bump:", bump);
