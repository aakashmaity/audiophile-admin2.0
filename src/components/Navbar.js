"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const inactiveLink = "flex gap-1 p-1 items-center hover:text-white";
  const activeLink = inactiveLink + " text-white rounded-md";

  const router = useRouter();

  const { pathname } = router;


  async function LogOut() {
    try {
      await axios.post("/api/admin/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <aside
      className={
        "md:flex md:flex-row md:justify-between items-center top-0 bg-textBlack2 w-full text-textWhite2 p-4 px-10 fixed transition-all"
      }
    >
      <div className="flex justify-between">
        <span className="font-bold text-textWhite1">Audiophile Admin</span>
        <button className="md:hidden" onClick={() => setShowNav(!showNav)}>
          {showNav ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="p-0 m-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                  fill="#ffffff"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-list p-0 m-0"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                fill="#ffffff"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          )}
        </button>
      </div>
      {showNav ? (
          <nav className="flex flex-col text-lg md:flex-row gap-2 ">
            <Link
              href={"/dashboard"}
              className={pathname === "/dashboard" ? activeLink : inactiveLink}
            >
              Dashboard
            </Link>
            <Link
              href={"/products"}
              className={
                pathname?.includes("/products") ? activeLink : inactiveLink
              }
            >
              Products
            </Link>
            <Link
              href={"/categories"}
              className={
                pathname?.includes("/categories") ? activeLink : inactiveLink
              }
            >
              <span>Categories</span>
            </Link>
            <Link
              href={"/orders"}
              className={
                pathname?.includes("/orders") ? activeLink : inactiveLink
              }
            >
              Orders
            </Link>
          </nav>
      ) : null}

      {showNav ? (
        <nav className="flex text-lg flex-col md:flex-row md:mt-0 mt-2 gap-2">
          <Link
            href={"/profile"}
            className={
              pathname?.includes("/profile") ? activeLink : inactiveLink
            }
          >
            Profile
          </Link>
          <button onClick={LogOut} className={inactiveLink}>
            Logout
          </button>
        </nav>
      ) : null}

      <Toaster />
    </aside>
  );
};

export default Navbar;
