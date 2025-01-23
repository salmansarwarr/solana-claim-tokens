import {
    createV1,
    mplTokenMetadata,
    TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
    keypairIdentity,
    percentAmount,
    publicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { readFileSync } from "fs";

const umi = createUmi("https://api.devnet.solana.com")
    .use(mplTokenMetadata())
    .use(mplToolbox());

// You will need to us fs and navigate the filesystem to
// load the wallet you wish to use via relative pathing.
const keypairFile = JSON.parse(
    readFileSync(
        "YOUR-KEYPAIR-FILE-PATH",
        "utf-8"
    )
);

const wallet = umi.eddsa.createKeypairFromSecretKey(
    Uint8Array.from(keypairFile)
);

// Load the keypair into umi.
umi.use(keypairIdentity(wallet));

// your SPL Token mint address
const mint = publicKey("8fwnWn27RqEhheExemtUFHhQcAgYXtBdF1X4Bdydy435");

// Sample Metadata for our Token
const tokenMetadata = {
    name: "Solana Gold",
    symbol: "GOLDSOL",
    uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
};

// Add metadata to an existing SPL token wrapper function
async function addMetadata() {
    try {
        const rawTx = await createV1(umi, {
            mint,
            authority: umi.identity,
            payer: umi.identity,
            updateAuthority: umi.identity,
            name: tokenMetadata.name,
            symbol: tokenMetadata.symbol,
            uri: tokenMetadata.uri,
            sellerFeeBasisPoints: percentAmount(5.5),
            tokenStandard: TokenStandard.Fungible,
        });

        await rawTx.sendAndConfirm(umi);
    } catch (error) {
        console.error("Error adding metadata:", error);
    }
}

// run the function
addMetadata();
