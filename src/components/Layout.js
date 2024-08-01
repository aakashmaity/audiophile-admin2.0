"use client"

import Logo from "./Logo";
import Navbar from "./Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
  

  return (
    <>
      <div className="bg-bgBlack min-h-full min-w-full">
        <div className=" flex items-center m-0">
          <div className="flex md:flex-row grow justify-between mx-0">
            <Navbar/>
          </div>
        </div>
        <div className="flex h-full mt-12">
          <div className=" flex-grow p-4 overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
