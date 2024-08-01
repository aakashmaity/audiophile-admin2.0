"use client";

import Layout from "@/components/Layout";
import { Loader } from "@/components/Reactspinner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [adminData, setAdminData] = useState();

  async function getAdminDetails() {
    try {
      const res = await axios.get("/api/admin/adminDetails");
      setAdminData(res.data?.admin);
    } catch (error) {
      console.error("Failed to get admin details :", error);
      toast.error("Failed to get admin details");
    }
  }

  useEffect(() => {
    getAdminDetails();
  }, []);

  if (!adminData) {
    return <Loader />;
  }

  async function handleLogout() {
    try {
      const response = await axios.post("api/admin/logout");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleVerifyAdmin() {
    try {
      const data = {
        email: adminData.email,
        emailType: "VERIFY",
        id: adminData._id,
      };
      await axios.post("/api/admin/sendEmail", data);
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error("Failed to verify admin.");
    }
  }

  return (
    <>
      <Layout>
        <div className=" space-x-3">
          {/* <h2 className=" text-textWhite1">{adminData?.name}</h2> */}
          <button
            onClick={handleVerifyAdmin}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            Verify your account
          </button>
          <button
            onClick={handleLogout}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            Logout
          </button>
          <Link
            href={`/profile/${adminData?._id}`}
            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
          >
            Edit profile
          </Link>

          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </Layout>
    </>
  );
}
