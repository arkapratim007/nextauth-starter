"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const [verificationToken, setVerificationToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyEmail = async () => {
        try{
          await axios.post("/api/users/verifyemail", {verificationToken})
            setVerified(true);

        }catch(error:any){
            setError(error.message || "An error occurred during email verification.");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setVerificationToken(urlToken);
    }, []);
    

    useEffect(() => {
        if(verificationToken.length > 0){
            verifyEmail();
        }
    }, [verificationToken]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-zinc-800 p-8 rounded shadow-md w-full max-w-md">
                {verified ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Email Verified</h1>
                        <p className="text-gray-500">Your email has been verified successfully.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
                        <p className="text-gray-600">Verifying your email...</p>
                    </div>
                )}
            </div>
        </div>
    )
}