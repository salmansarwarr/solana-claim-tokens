"use client";

import { AnchorProvider, BN, Program, utils, web3 } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import idl from "../assets/meth.json";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { toast } from "react-toastify";
import { tokenDecimals } from "../constants/constants";

const programId = new PublicKey(idl.address);
const network = clusterApiUrl("devnet");
const opts = {
    preflightCommitment: "confirmed",
};

const truncate = (str, maxLength) =>
    str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

const Page = () => {
    const [message, setMessage] = useState("");
    const [totalTokensInput, setTotalTokensInput] = useState("");
    const [walletAddress, setWalletAddress] = useState();

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
                toast.error("Solana wallet not found! Get a Phantom wallet");
            }
        } catch (error) {
            console.log(error);
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

    const initializeMeth = async () => {
        if (!totalTokensInput || isNaN(totalTokensInput)) {
            setMessage("Please enter a valid total tokens amount.");
            return;
        }

        const totalTokens = new BN(totalTokensInput * Math.pow(10, tokenDecimals));
        const provider = getProvider();
        const program = new Program(idl, provider);
        const [methPDA, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from("meth")],
            programId
        );

        try {
            await program.methods
                .initializeMeth(totalTokens, bump)
                .accounts({
                    meth: methPDA,
                    admin: provider.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc();
            setMessage(
                `Meth initialized with address ${methPDA.toString()}`
            );
        } catch (error) {
            console.error(error);
            setMessage("Failed to initialize meth.");
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <button
                onClick={connectWallet}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-8
                                    ${
                                        walletAddress
                                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
            >
                {walletAddress ? truncate(walletAddress, 10) : "Connect Wallet"}
            </button>
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                    Initialize
                </h2>
                <input
                    type="number"
                    placeholder="Total Tokens"
                    value={totalTokensInput}
                    onChange={(e) => setTotalTokensInput(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    onClick={initializeMeth}
                    className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Initialize
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Page;
