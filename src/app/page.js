"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputGroup from "@/components/InputGroup";
const inter = Inter({ subsets: ["latin"] });

export default function LoginPage() {
  const router = useRouter();

  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // validation
    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // send data to server
      const data = { username, password };
      const response = await axios.post("/api/admin/login", data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <Link href="/">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Audiophile
        </div>
      </Link>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div
          className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked="1"
        ></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col items-center p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Sign In
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              
              <InputGroup type="text" name={username} label="Username" value ={username} onChange={setUserame}/>
              <InputGroup type="password" name={password} label="Password" value ={password} onChange={setPassword}/>

              <div className="mt-4 flex items-center justify-end">
                <Link
                  className="text-sm font-medium text-foreground"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-4 flex items-center justify-between gap-x-2">
                <Link
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-gray-600 h-10 px-4 py-2 duration-200"
                  href="/signup"
                >
                  Register
                </Link>
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>

            {/* Login with google, github etc section */}

            <div className="flex flex-col items-center justify-center space-y-3"></div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
