import { useState } from 'react';
import { Wallet, Lock, ArrowRight, Coins } from 'lucide-react';

const TokenClaimPage = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [solanaAddress, setSolanaAddress] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F0FF] p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-[#2D3748]">Claim Your Tokens</h1>
                    <p className="text-lg text-gray-600">
                        Connect your Ethereum wallet to claim your allocated Solana tokens
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#2D3748]">Token Claim Portal</h2>
                            <p className="text-gray-500 mt-1">Your tokens will be minted directly to your Solana wallet</p>
                        </div>

                        {/* Wallet Status Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Wallet className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-[#2D3748]">
                                        {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsWalletConnected(!isWalletConnected)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                                    ${isWalletConnected
                                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                                </button>
                            </div>
                        </div>

                        {/* ETH Balance Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Coins className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-[#2D3748]">ETH Balance</span>
                                </div>
                                <span className="text-lg font-bold text-[#2D3748]">
                                    {isWalletConnected ? '2.5 ETH' : '-.-- ETH'}
                                </span>
                            </div>
                        </div>

                        {/* Solana Address Input */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="space-y-3">
                                <label htmlFor="solana-address" className="block text-sm font-medium text-gray-700">
                                    Enter Solana Address
                                </label>
                                <input
                                    id="solana-address"
                                    type="text"
                                    value={solanaAddress}
                                    onChange={(e) => setSolanaAddress(e.target.value)}
                                    placeholder="Solana wallet address"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white/90"
                                    disabled={!isWalletConnected}
                                />
                            </div>
                        </div>

                        {/* Token Info Card */}
                        <div className="bg-[#F8F0FF] p-6 rounded-lg border border-blue-600/10">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Lock className="w-6 h-6 text-blue-600" />
                                        <span className="font-medium text-[#2D3748]">Available Tokens</span>
                                    </div>
                                    <span className="text-lg font-bold text-[#2D3748]">1,000 SOL</span>
                                </div>
                                <div className="h-2 bg-blue-600/10 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Total Claimed: 75%</span>
                                    <span>Remaining: 25%</span>
                                </div>
                            </div>
                        </div>

                        {/* Claim Button */}
                        <button
                            disabled={!isWalletConnected || !solanaAddress}
                            className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2
                            ${isWalletConnected && solanaAddress
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 transition-all'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>Claim Tokens</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Info Section */}
                        <div className="text-sm text-gray-500 text-center">
                            Make sure you have enough SOL in your wallet for transaction fees
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenClaimPage;