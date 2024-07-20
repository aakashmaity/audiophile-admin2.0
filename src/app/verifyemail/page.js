"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [emailType, setEmailType] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1].split("&")[0];
    const type = window.location.search.split("=")[2];

    // console.log(type, urlToken);
    setToken(urlToken || "");
    setEmailType(type || "");
  }, []);

  async function handleVerification() {
    try {
      const response = await axios.post("/api/admin/verifyemail", {
        token,
        emailType,
      });
      setVerified(true);
      toast.success(response.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      if (password.length < 8) {
        toast.error("Password should be at least 8 characters long");
        return;
      }

      if (password !== cpassword) {
        toast.error("Passwords do not match");
        return;
      }
      const response = await axios.post("/api/admin/verifyemail", {
        token,
        emailType,
        password,
      });
      toast.success(response.data?.message);

      setTimeout(() => {
        router.push("/");
      }, 700);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  }

  return (
    <>
      <div>
        {emailType === "verify" ? (
          <>
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
          </>
        ) : (
          <>
            <div className=" text-black flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
              <h1>Password Reset - {token}</h1>
              <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div
                  className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
                  bis_skin_checked="1"
                ></div>
                <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                  <div className="flex flex-col items-center p-6">
                    <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                      Reset password
                    </h3>
                  </div>
                  <div className="p-6 pt-0">
                    <form onSubmit={handleResetPassword}>
                      <div>
                        <div className="space-y-2">
                          <div className="group relative rounded-lg border-2 focus-within:border-sky-200 px-3 pb-1 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                            <div className="flex justify-between">
                              <label className="text-xs font-medium text-muted-foreground text-gray-400">
                                Password
                              </label>
                            </div>
                            <input
                              type="password"
                              name="password"
                              autoComplete="off"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                            />
                          </div>
                          <div className="group relative rounded-lg border-2 focus-within:border-sky-200 px-3 pb-1 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                            <div className="flex justify-between">
                              <label className="text-xs font-medium text-muted-foregroun text-gray-400">
                                Confirm Password
                              </label>
                            </div>
                            <input
                              type="text"
                              name="cpassword"
                              value={cpassword}
                              autoComplete="off"
                              onChange={(e) => setCpassword(e.target.value)}
                              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-x-2">
                        <button
                          className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>

                    <div className="flex flex-col items-center justify-center space-y-3"></div>
                  </div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </div>
            </div>
          </>
        )}
        <Toaster />
      </div>
    </>
  );
}