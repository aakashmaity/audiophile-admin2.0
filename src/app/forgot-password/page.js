"use client";


import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputGroup from "@/components/InputGroup";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [username, setUserame] = useState("");

  async function handleForgotpassword(e) {
    e.preventDefault();
    // validation
    if (!username) {
      toast.error("Please enter your username");
      return;
    }

    try {
      // send data to server
      const response = await axios.post("/api/admin/adminDetails",{username});

      if(!response.data?.success){
        toast.error("Username not found");
        return;
      }

      const adminData = response.data?.admin;
      const data = {
        email: adminData.email,
        emailType: "RESET",
        id: adminData._id,
      };
      const res = await axios.post("/api/admin/sendEmail", data)
      toast.success(res.data?.message);
      setTimeout(() =>{
        toast.dismiss();
        router.push("/");
      },1000);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div className=" bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
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
          Ecommerce
        </div>
      </Link>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div
          className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked="1"
        ></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="p-6 pt-0">
            <form onSubmit={handleForgotpassword}>
              <InputGroup type="text" name={username} label="Username" value ={username} onChange={setUserame} />
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
  );
}
