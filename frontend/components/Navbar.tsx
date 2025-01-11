import Link from "next/link";
import Logo from "./Logo";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    {/* <Logo /> */}
                </div>
                <span className="text-xl font-bold text-black">
                    StreamWiseAI
                </span>
            </div>

            {/* Menu items */}
            <div className="hidden md:flex space-x-8">
                <div className="relative group">
                    <button className="text-gray-700 font-medium">
                        Features
                    </button>
                    {/* Dropdown (if needed) */}
                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md p-2">
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Sub-feature 1
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Sub-feature 2
                        </a>
                    </div>
                </div>
                <a href="#" className="text-gray-700 font-medium">
                    Pricing
                </a>
                <a href="#" className="text-gray-700 font-medium">
                    Documentation
                </a>
                <div className="relative group">
                    <button className="text-gray-700 font-medium">
                        Solutions
                    </button>
                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md p-2">
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Solution 1
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Solution 2
                        </a>
                    </div>
                </div>
                <div className="relative group">
                    <button className="text-gray-700 font-medium">
                        Resources
                    </button>
                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md p-2">
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Blog
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Help Center
                        </a>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="space-x-4">
                <button className="px-4 py-2 bg-white text-black border border-black rounded-md font-medium">
                    Contact Sales
                </button>
                <SignedOut>
                    <SignInButton>
                        <PrimaryButton href={"/login"}>Log In</PrimaryButton>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    );
}

const PrimaryButton = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    return (
        <Link
            className="px-4 py-2 bg-black text-white rounded-md font-medium"
            href={href}
        >
            {children}
        </Link>
    );
};
