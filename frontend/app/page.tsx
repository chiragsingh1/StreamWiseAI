"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className="align-center flex flex-col justify-center items-center h-screen">
            Landing Homepage
            <div
                onClick={() => router.push("/login")}
                className={`text-xl px-10 py-2  cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center flex justify-center flex-col max-w-min mt-5`}
            >
                Login
            </div>
        </div>
    );
}
