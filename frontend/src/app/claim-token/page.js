"use client";

import { useEffect, useState } from "react";
import { Wallet, Lock, ArrowRight, Coins } from "lucide-react";
import { toast } from "react-toastify";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import idl from "../assets/meth.json";
import {
    alchemyUrl,
    ethTokenAddress,
    tokenAddress,
    tokenDecimals,
} from "../constants/constants";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import {
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress,
} from "@solana/spl-token";
import { ethers } from "ethers";

const truncate = (str, maxLength) =>
    str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

const programId = new PublicKey(idl.address);
const network = clusterApiUrl("devnet");
const opts = {
    preflightCommitment: "confirmed",
};

const Page = () => {
    const [ethAddress, setEthAddress] = useState("");
    const [walletAddress, setWalletAddress] = useState();
    const [balance, setBalance] = useState();
    const [claimedAmount, setClaimedAmount] = useState();
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);

    const checkETHBalance = async () => {
        if (!ethAddress) {
            toast.warn("Please enter wallet address");
            return;
        }

        setIsLoadingBalance(true);

        try {
            // Connect to Ethereum network
            const provider = new ethers.JsonRpcProvider(alchemyUrl);

            // ERC-20 ABI
            const erc20Abi = [
                "function balanceOf(address owner) view returns (uint256)",
                "function decimals() view returns (uint8)",
            ];

            // Create a contract instance
            const tokenContract = new ethers.Contract(
                ethTokenAddress,
                erc20Abi,
                provider
            );

            // Fetch the token balance and decimals
            const rawBalance = await tokenContract.balanceOf(ethAddress);
            const decimals = await tokenContract.decimals();

            // Format the balance
            const formattedBalance = ethers.formatUnits(rawBalance, decimals);

            setBalance(formattedBalance);
            console.log(formattedBalance);
            await fetchClaimedAmount();
        } catch (error) {
            console.error("Error fetching balance:", error);
            toast.error("Error fetching balance");
        } finally {
            setIsLoadingBalance(false);
        }
    };

    const checkIfTokenAccountExists = async (
        connection,
        receiverTokenAccountAddress
    ) => {
        // Check if the receiver's token account exists
        try {
            await getAccount(
                connection,
                receiverTokenAccountAddress,
                "confirmed",
                TOKEN_PROGRAM_ID
            );

            return true;
        } catch (error) {
            return false;
        }
    };

    const fetchClaimedAmount = async () => {
        try {
            const provider = getProvider();
            if (!provider.wallet?.publicKey) {
                toast.error("Please connect your wallet first");
                return;
            }

            const program = new Program(idl, provider);

            const [methPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("meth")],
                programId
            );

            const methAccount = await program.account.meth.fetch(methPDA);

            // // Find the user's claimed account
            const recipient = methAccount.recipients.find(
                (am) =>
                    am.recipient.toBase58() ===
                    provider.wallet.publicKey.toBase58()
            );

            console.log(
                Number(recipient.amount.toString()) / 10 ** tokenDecimals
            );

            if (recipient) {
                setClaimedAmount(
                    Number(recipient.amount.toString()) / 10 ** tokenDecimals
                );
            } else {
                setClaimedAmount(0);
                return 0;
            }
        } catch (error) {
            console.log("Failed to fetch eligible balance:", error);
            setClaimedAmount(0);
            return 0;
        }
    };

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new AnchorProvider(
            connection,
            window.solana,
            opts.preflightCommitment
        );
        return provider;
    };

    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;
            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found");
                    const response = await solana.connect({
                        onlyIfTrusted: true,
                    });
                    console.log(
                        "Connected with public key:",
                        response.publicKey.toString()
                    );
                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                alert("Solana wallet not found! Get a Phantom wallet");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        const { solana } = window;
        if (solana) {
            const response = await solana.connect();
            console.log(
                "Connected with public key:",
                response.publicKey.toString()
            );
            toast.success(
                `Connected with public key: ${response.publicKey.toString()}`
            );
            setWalletAddress(response.publicKey.toString());
        }
    };

    const claim = async () => {
        let tempBalance = balance;

        if (!balance) {
            await checkETHBalance();
            try {
                // Connect to Ethereum network
                const provider = new ethers.JsonRpcProvider(alchemyUrl);

                // ERC-20 ABI
                const erc20Abi = [
                    "function balanceOf(address owner) view returns (uint256)",
                    "function decimals() view returns (uint8)",
                ];

                // Create a contract instance
                const tokenContract = new ethers.Contract(
                    ethTokenAddress,
                    erc20Abi,
                    provider
                );

                // Fetch the token balance and decimals
                const rawBalance = await tokenContract.balanceOf(ethAddress);
                const decimals = await tokenContract.decimals();

                // Format the balance
                const formattedBalance = ethers.formatUnits(
                    rawBalance,
                    decimals
                );

                await fetchClaimedAmount();

                tempBalance = formattedBalance;
            } catch (error) {
                console.error("Error fetching balance:", error);
                toast.error("Error fetching balance");
            }
        }

        let tempClaimedAmount = claimedAmount;

        if (!claimedAmount) {
            try {
                const provider = getProvider();
                if (!provider.wallet?.publicKey) {
                    toast.error("Please connect your wallet first");
                    return;
                }

                const program = new Program(idl, provider);

                const [methPDA] = PublicKey.findProgramAddressSync(
                    [Buffer.from("meth")],
                    programId
                );

                const methAccount = await program.account.meth.fetch(methPDA);

                console.log(methAccount.recipients);

                // // Find the user's claimed account
                const recipient = methAccount.recipients.find(
                    (am) =>
                        am.recipient.toBase58() ===
                        provider.wallet.publicKey.toBase58()
                );

                if (recipient) {
                    tempClaimedAmount =
                        Number(recipient.amount.toString()) /
                        10 ** tokenDecimals;
                } else {
                    tempClaimedAmount = 0;
                }
            } catch (error) {
                console.log("Failed to fetch eligible balance:", error);
            }
        }

        if (tempBalance - tempClaimedAmount <= 0) {
            toast.error("No tokens to claim");
            return;
        }

        const connection = new Connection(network, opts.preflightCommitment);
        const provider = getProvider();
        const program = new Program(idl, provider);
        const [methPDA, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from("meth")],
            programId
        );

        const mintAddress = new PublicKey(tokenAddress);

        try {
            const userWallet = provider.wallet.publicKey;

            const userTokenAccount = await getAssociatedTokenAddress(
                mintAddress,
                userWallet
            );

            const vault = await getAssociatedTokenAddress(
                mintAddress,
                methPDA,
                true
            );

            const isTokenAccountAlreadyMade = await checkIfTokenAccountExists(
                connection,
                userTokenAccount
            );

            if (isTokenAccountAlreadyMade) {
                console.log(
                    `Token account already exists at ${userTokenAccount}, no need to make it`
                );
            } else {
                console.log(
                    `Token account does not exist at ${userTokenAccount}, adding instruction to make it`
                );
                toast.warn(
                    `Token account does not exist at ${userTokenAccount}, adding instruction to make it`
                );
                const ix = await createAssociatedTokenAccountInstruction(
                    userWallet,
                    userTokenAccount,
                    userWallet,
                    mintAddress
                );
                const transaction = new Transaction().add(ix);
                transaction.feePayer = userWallet;
                transaction.recentBlockhash = (
                    await connection.getLatestBlockhash()
                ).blockhash;

                // Sign and send the transaction
                const signedTransaction = await provider.wallet.signTransaction(
                    transaction
                );
                const txId = await connection.sendRawTransaction(
                    signedTransaction.serialize()
                );
                await connection.confirmTransaction(txId);
                console.log("Token account created:", txId);
            }

            const tokenAmount = new BN(balance * Math.pow(10, tokenDecimals))

            await program.methods
                .claim(tokenAmount)
                .accounts({
                    meth: methPDA,
                    vault: vault,
                    userTokenAccount: userTokenAccount,
                    user: userWallet,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc();

            toast.success("Meth claimed successfully!");
        } catch (error) {
            console.error(error);
            console.log("Logs:", error.logs);
            toast.error("Failed to claim tokens.");
        }
    };

    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F0FF] p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#2D3748]">
                        Claim Your Tokens
                    </h1>
                    <p className="text-lg text-gray-600">
                        Connect your Solana wallet to claim your allocated
                        tokens
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#2D3748]">
                                Token Claim Portal
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Your tokens will be minted directly to your
                                Solana wallet
                            </p>
                        </div>

                        {/* Wallet Status Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Wallet className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-[#2D3748]">
                                        {walletAddress
                                            ? "Wallet Connected"
                                            : "Connect Wallet"}
                                    </span>
                                </div>
                                <button
                                    onClick={connectWallet}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                                    ${
                                        walletAddress
                                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {walletAddress
                                        ? truncate(walletAddress, 10)
                                        : "Connect Wallet"}
                                </button>
                            </div>
                        </div>

                        {/* ETH Address Input */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="space-y-3">
                                <label
                                    htmlFor="solana-address"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Enter ETH Address
                                </label>
                                <input
                                    id="solana-address"
                                    type="text"
                                    value={ethAddress}
                                    onChange={(e) =>
                                        setEthAddress(e.target.value)
                                    }
                                    placeholder="ETH wallet address"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white/90"
                                    disabled={!walletAddress}
                                />
                            </div>
                        </div>

                        <button
                            onClick={checkETHBalance}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all bg-blue-600 text-white hover:bg-blue-700`}
                        >
                            Check Balance
                        </button>

                        {/* ETH Balance Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Coins className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-[#2D3748]">
                                        ETH Balance
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-[#2D3748]">
                                    {isLoadingBalance ? (
                                        <div className="animate-pulse">
                                            Loading...
                                        </div>
                                    ) : balance ? (
                                        `${balance} ETH`
                                    ) : (
                                        "-.-- ETH"
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Token Info Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Lock className="w-6 h-6 text-blue-600" />
                                        <span className="font-medium text-[#2D3748]">
                                            Available Tokens
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-[#2D3748]">
                                        {isLoadingBalance ? (
                                            <div className="animate-pulse">
                                                Loading...
                                            </div>
                                        ) : balance ? (
                                            `${
                                                balance > claimedAmount
                                                    ? balance - claimedAmount
                                                    : 0
                                            }`
                                        ) : (
                                            "-.--"
                                        )}
                                    </span>
                                </div>
                                {/* <div className="h-2 bg-blue-600/10 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
                                </div> */}
                                {/* <div className="flex justify-between text-sm text-gray-500">
                                    <span>Total Claimed: 75%</span>
                                    <span>Remaining: 25%</span>
                                </div> */}
                            </div>
                        </div>

                        {/* Claim Button */}
                        <button
                            disabled={!walletAddress || !ethAddress}
                            className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2
                            ${
                                walletAddress && ethAddress
                                    ? "bg-blue-600 text-white hover:bg-blue-700 transition-all"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            onClick={claim}
                        >
                            <span>Claim Tokens</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Info Section */}
                        <div className="text-sm text-gray-500 text-center">
                            Make sure you have enough SOL in your wallet for
                            transaction fees
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
