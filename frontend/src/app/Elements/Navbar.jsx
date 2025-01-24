'use client'

import { useState } from "react";
import logo from "../assets/Images/MethaLogo2.png";
import logo1 from "../assets/Images/MethaLogo.png";
import bg5new from "../assets/Images/bg5new.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
            <Image
                src={bg5new}
                alt="Background"
                className="hidden lg:block absolute top-[0%] left-[50%] w-[200px] object-contain z-0 transition-transform duration-500 ease-in-out"
            />

            <div className="mx-auto px-4 sm:px-6 lg:px-[2%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}

                    <aside className="flex items-center gap-3">
                        <article className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-black font-bold text-2xl"
                            >
                                <Image src={logo} className="w-32" alt="" />
                            </a>
                        </article>

                        {/* Desktop Menu */}
                        <article className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md transition-colors duration-300"
                                >
                                    X
                                </Link>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md transition-colors duration-300"
                                >
                                    TikTok
                                </Link>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md transition-colors duration-300"
                                >
                                    YouTube
                                </Link>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md transition-colors duration-300"
                                >
                                    Telegram
                                </Link>
                                <Link
                                    href="/claim-token"
                                    className="text-sm font-medium text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md transition-colors duration-300"
                                >
                                    Claim Token
                                </Link>
                            </div>
                        </article>
                    </aside>

                    {/* Desktop Right Links */}
                    <div className="hidden md:block">
                        <div className="ml-4  md:ml-6">
                            <button className="flex items-center px-3 py-1  gap-1 border rounded-[30px]">
                                <Image
                                    src={logo1}
                                    className="w-8 mt-[8px]"
                                    alt=""
                                />
                                <p className="text-[13px]">$METH Swap</p>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <article className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 12h18M3 6h18M3 18h18"></path>
                                </svg>
                            )}
                        </button>
                    </article>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div id="menu" className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="#"
                            className="text-gray-900 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            X
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-900 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            TikTok
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-900 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            YouTube
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-900 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Telegram
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
