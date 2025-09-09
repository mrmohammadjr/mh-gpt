"use client";
import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { getGroqChatCompletion } from "../actions/reqAi";
import { saveData } from "../data/save";
export interface Response {
  id?: Number;
  role?: "user" | "ai";
  message?: string; 
}
type reqProps = {
  reqRes: Response[];
  setReqRes: React.Dispatch<React.SetStateAction<Response[]>>;
  setStatusaimessage: React.Dispatch<React.SetStateAction<string>>;
};
const Prompt = ({ setReqRes, reqRes, setStatusaimessage }: reqProps) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userMessage = e.target[0].value.trim();
    if (!userMessage) return;
    const userReqMessage: Response = {
      id: Date.now(),
      role: "user",
      message: String(e.target[0].value),
    };
    setReqRes((prev) => [...prev, userReqMessage]);
    try {
      setStatusaimessage("Generating response");
      const result = await getGroqChatCompletion(e.target[0].value);
      if (result) {
        if (result.status === 200) {
          const newMessage: Response = {
            id: Date.now(),
            role: "ai",
            message: result.message ?? "",
          };
          setReqRes((prev) => [...prev, newMessage]);
          saveData(
            "messages",
            JSON.stringify([...reqRes, userReqMessage, newMessage])
          );
          setStatusaimessage("success");
        } else {
          setStatusaimessage("Failed to get response");
        }
      }
    } catch (error) {
      console.error(error);
    }
    e.target[0].value = "";
  };
  return (
    <div className="px-10 h-[20%] lg:w-[50%] md:w-[70%]">
      <form
        onSubmit={handleSubmit}
        className="bg-black w-full rounded-xl p-5 flex justify-between items-center"
      >
        <input
          type="text"
          className="text-white transition-all outline-none border-b-2 border-white w-[90%] hover:text-zinc-500 hover:border-zinc-500"
          placeholder="Enter Your Message..."
        />
        <button className="text-white p-2 rounded-xl transition-all hover:text-black hover:bg-[#004030]">
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
};

export default Prompt;
