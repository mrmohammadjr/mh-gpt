"use client";
import React, { useState } from "react";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";
import { RiChatNewFill } from "react-icons/ri";
import { removeData } from "../data/save";
import { Response } from "../types/types";
import { BsLink45Deg } from "react-icons/bs";

type SidebarProps = {
  setReqRes: React.Dispatch<React.SetStateAction<Response[]>>;
};
const MobileSideBar = ({ setReqRes }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-[#3E5F44] p-2 lg:hidden w-full h-[100vh] sm:block max-sm:block md:block">
      <TbLayoutSidebarLeftCollapseFilled
        className="text-6xl bg-[#3E5F44]  text-white"
        onClick={() => setShowSidebar(true)}
      />

      <div
        className={`top-0 left-0 bg-[#3E5F44] border-r-2 border-zinc-500 ${
          showSidebar ? "shadow-[10px_0px_90px_6px_rgba(0,0,0,0.61)]" : ""
        } p-5 w-[30%] h-[100vh] lg:hidden flex-col sm:flex max-sm:flex fixed z-20 ease-in-out duration-300 ${
          showSidebar ? "shadows translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-center text-white text-2xl">MH GPT</h1>
          <TbLayoutSidebarRightCollapseFilled
            className="text-3xl text-white"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        <div className="m-3">
          <div className="sticky w-11 p-2 hover:bg-gray-500 hover:w-36 hover:flex hover:justify-between hover:items-center transition-all overflow-hidden rounded-full hover:text-[#3E5F44]">
            <RiChatNewFill className="text-4xl" />
            <h1
              className="absolute cursor-pointer left-14 text-sm"
              onClick={() => {
                removeData("messages");
                setReqRes([]);
                setShowSidebar(false);
              }}
            >
              New Chat
            </h1>
          </div>
        </div>
        <div className="mt-5 flex gap-5 justify-center items-center bg-black text-white w-fit p-2 rounded-2xl hover:gap-2 hover:text-purple-500 transition-all">
          <BsLink45Deg />
          <Link href={"https://mrmohammadjr.github.io/portfolio-app/"}>
            Author
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
