"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Admindetails({ params }) {
  const [adminData, setAdminData] = useState();

  async function getAdminDetails() {
    try {
      const res = await axios.get("/api/admin/adminDetails");
      setAdminData(res.data?.admin);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAdminDetails();
  }, []);

  if (!adminData) {
    return <div>Loading....</div>;
  }

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-white">admin Details {params.id}</h1>
        <h3>{adminData?.name}</h3>
        <h3>{adminData?.username}</h3>
        <h3>{adminData?._id}</h3>
        <Toaster />
      </div>
    </Layout>
  );
}
