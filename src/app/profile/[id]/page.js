"use client";

import Layout from "@/components/Layout";
import { Loader } from "@/components/Reactspinner";
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
    return (
      <Loader/>
    );
  }

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-center text-textWhite2">
        <h1>admin Details {params.id}</h1>
        <h3>Name: {adminData?.name}</h3>
        <h3>Username : {adminData?.username}</h3>
        <h3>DB Id: {adminData?._id}</h3>
        <Toaster />
      </div>
    </Layout>
  );
}
