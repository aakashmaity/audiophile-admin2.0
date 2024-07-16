"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  async function handleVerification() {
    try {
      const response = await axios.post("/api/admin/verifyemail", { token });
      setVerified(true);
      toast.success(response.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
      setError(true);
    }
  }

  return (
    <>
      <div>
        <h1>Email verification - {token}</h1>
        {!verified ? (
          <button
            onClick={handleVerification}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            Verify Email
          </button>
        ) : (
          <div>
            <p>Email verified!</p>
            <Link
              href="/"
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
              Login
            </Link>
          </div>
        )}

        {error && (
          <p className=" text-white p-3 bg-red-600"> Verification Failed</p>
        )}

        <Toaster />
      </div>
    </>
  );
}
