import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "StreamWiseAI",
    description: "LLM Based LiveStream Chat Filtering. Built with Next App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {/* <SignedOut>
                        <SignInButton />
                    </SignedOut> */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
