"use client";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import Prompt from "./Prompt";
import { loadData } from "../data/save";
import Sidebar from "./Sidebar";
import MobileSideBar from "./MobileSideBar";
import { Response } from "../types/types";

const Chatroom = () => {
  const [reqRes, setReqRes] = useState<Response[]>([]);
  const [statusaimessage, setStatusaimessage] = useState<string>("");
  const load = loadData("messages");
  useEffect(() => {
    const load = loadData("messages");
    if (load && typeof load === "string" && load.trim() !== "") {
      setReqRes(JSON.parse(load));
    }
  }, [load]);

  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[20%] max-sm:w-[20%]">
        <MobileSideBar setReqRes={setReqRes} />
        <Sidebar setReqRes={setReqRes} />
      </div>
      <div className="bg-[#004030] lg:w-[80%] sm:w-[100%] max-sm:w-[100%] flex flex-col items-center gap-3">
        <Messages statusaimessage={statusaimessage} reqRes={reqRes} />
        <Prompt
          reqRes={reqRes}
          setStatusaimessage={setStatusaimessage}
          setReqRes={setReqRes}
        />
      </div>
    </div>
  );
};

export default Chatroom;
