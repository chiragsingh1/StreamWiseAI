import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <section className="flex justify-center items-center h-screen">
            <SignIn forceRedirectUrl={"/dashboard"} />
        </section>
    );
}
