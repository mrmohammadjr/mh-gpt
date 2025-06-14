import React, { useEffect, useState } from "react";
import { fetchAIResponse, clearAIResponse } from "../context/reqAI";
import { useAppDispatch, useAppSelector } from "../context/store";
import { FaArrowUp } from "react-icons/fa6";
import { saveMessage } from "../data/db";

type reqProps = {
  setReqRes: React.Dispatch<
    React.SetStateAction<{ id: number; role: "user" | "ai"; message: string }[]>
  >;
  setStatusaimessage: React.Dispatch<React.SetStateAction<string>>;
};

const Prompt = ({ setReqRes, setStatusaimessage }: reqProps) => {
  const { aiResponse, status } = useAppSelector((state) => state.aiData);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  // Helper function to add and persist messages
  const addAndSaveMessage = async (role: "user" | "ai", message: string) => {
    const newMessage = {
      id: Date.now(),
      role,
      message,
    };

    // Update state optimistically
    setReqRes((prev) => [...prev, newMessage]);

    try {
      // Save to IndexedDB
      await saveMessage(newMessage);
    } catch (error) {
      console.error("Failed to save message:", error);
      // Rollback state on error
      setReqRes((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      throw error; // Re-throw if you want to handle this elsewhere
    }
  };

  useEffect(() => {
    setStatusaimessage(status);
    if (status === "succeeded" && aiResponse) {
      // Save AI response to IndexedDB
      addAndSaveMessage("ai", aiResponse.text);
      dispatch(clearAIResponse());
    }
  }, [status, aiResponse, setReqRes, dispatch]);

  async function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    try {
      // Save user message to IndexedDB
      await addAndSaveMessage("user", userMessage);
      setInputValue("");

      // Fetch AI response
      await dispatch(fetchAIResponse(userMessage));
    } catch (error) {
      console.error("Error in sendData:", error);
    }
  }

  return (
    <div className="w-full flex justify-center h-[25%] items-center">
      <form
        onSubmit={sendData}
        className="bg-[#222831] lg:w-[60%] sm:w-[90%] max-sm:w-[90%] text-white p-5 flex justify-between items-center rounded-full border border-gray-500 lg:"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-[#344955] border border-gray-500 rounded-full outline-none lg:w-[90%] sm:w-[90%] max-sm:w-[80%] p-2"
          placeholder="Enter Your Message..."
        />
        <button
          type="submit"
          className="bg-[#000000] hover:bg-white hover:text-black cursor-pointer p-2.5 rounded-xl"
          disabled={status === "loading"}
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
};

export default Prompt;
