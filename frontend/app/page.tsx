"use client";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div>
            <Navbar />
            <HeroSection />
            <div>Landing Page</div>
        </div>
    );
}
