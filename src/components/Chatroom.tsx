import React, { useState } from "react";
import Messages from "./Messages";
import Prompt from "./Prompt";
interface Structure {
  id: number;
  role: "user" | "ai";
  message: string;
}
type ChatroomProps = {
  reqRes: { id: number; role: "user" | "ai"; message: string }[];
  setReqRes: React.Dispatch<React.SetStateAction<Structure[]>>

}
const Chatroom = ({reqRes,setReqRes}:ChatroomProps) => {
  
  const [statusaimessage,setStatusaimessage] = useState<string>('')
  return (
    <div className="bg-[#31363F] lg:w-[85%]  sm:w-[100%] max-sm:w-[100%]  h-[100vh] flex flex-col">
      <Messages reqRes={reqRes} statusaimessage={statusaimessage} setReqRes={setReqRes} />
      <Prompt setReqRes={setReqRes} setStatusaimessage={setStatusaimessage} />
    </div>
  );
};

export default Chatroom;
