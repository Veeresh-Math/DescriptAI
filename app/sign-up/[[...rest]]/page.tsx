import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-teal-100">
            <SignUp />
        </div>
    );
}
