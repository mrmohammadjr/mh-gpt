"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiChatNewFill } from "react-icons/ri";
import { BsLink45Deg } from "react-icons/bs";
import { removeData } from "../data/save";
import { Response } from "../types/types";
type SideProp = {
  setReqRes: React.Dispatch<React.SetStateAction<Response[]>>;
};
const Sidebar = ({ setReqRes }: SideProp) => {
  return (
    <div className="bg-[#3E5F44] w-full border-r-2 border-zinc-500 p-5 h-[100vh] lg:block sm:hidden max-sm:hidden md:hidden shadow-[10px_0px_90px_6px_rgba(0,0,0,0.61)]">
      <h1 className="text-center text-white text-2xl">MH GPT</h1>
      <div className="m-5 flex flex-col items-center">
        <div className="sticky w-11 p-2 hover:bg-gray-500 hover:w-52 hover:flex hover:justify-between hover:items-center transition-all overflow-hidden rounded-full hover:text-[#3E5F44]">
          <RiChatNewFill className="text-4xl" />
          <h1
            className="absolute cursor-pointer left-20 text-lg"
            onClick={() => {
              removeData("messages");
              setReqRes([]);
            }}
          >
            New Chat
          </h1>
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

export default Sidebar;
