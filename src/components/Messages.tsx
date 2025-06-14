import React, { useEffect, useState } from "react";
import Logo from "../assets/New Project.png";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { loadMessages } from "../data/db";
import { useTranslation } from "react-i18next";
interface Structure {
  id: number;
  role: "user" | "ai";
  message: string;
}

type reqProps = {
  reqRes: Structure[];
  statusaimessage: string;
  setReqRes: React.Dispatch<React.SetStateAction<Structure[]>>;
};

const Messages = ({ reqRes, statusaimessage, setReqRes }: reqProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { t } = useTranslation()
  useEffect(() => {
    const loadFromDB = async () => {
      try {
        const savedMessages = await loadMessages();
        // Only set messages from DB on first load (refresh)
        if (isFirstLoad && savedMessages.length > 0) {
          setReqRes(savedMessages);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };

    loadFromDB();
  }, []);

  // Determine which messages to display
  const displayMessages = isFirstLoad ? [] : reqRes;

  return (
    <div className="h-[75%] w-full flex flex-col items-center py-10 overflow-y-scroll">
      {displayMessages.length === 0 && !isLoading ? (
        <>
          <img src={Logo} alt="logo" className="w-[25%]" />
          <h1 className="bf text-center text-white lg:text-6xl sm:text-4xl max-sm:text-2xl py-10">
          {t("What can I help you with today?")}          </h1>
        </>
      ) : (
        <>
          {displayMessages.map((item, index) => (
            <div key={index} className="w-full">
              {item.role === "user" ? (
                <div className={`flex justify-start items-center w-fit gap-2 ml-10 my-10 lTr`}>
                  <FaUserCircle className="showHide text-3xl text-white" />
                  <div className="bg-white w-fit p-2.5 rounded-full">
                    <p className="text-left">{item.message}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end mr-10">
                  <div className={`flex justify-end items-center w-fit gap-2 rTl`}>
                    <div className="bg-[#000000] w-[80%] p-5 rounded-3xl">
                      <p className="text-left text-white">
                        {item?.message
                          ?.replace("<think>", "")
                          ?.replace("</think>", "")}
                      </p>
                    </div>
                    <FaRobot className="showHide text-3xl text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {isLoading && (
        <div className="text-white">{t("Loading chat history...")}</div>
      )}
      {statusaimessage === "loading" && (
        <div className="text-white">{t("Generating response...")}</div>
      )}
      {statusaimessage === "failed" && (
        <div className="mb-2 text-red-500">{t("Failed to get response")}</div>
      )}
    </div>
  );
};

export default Messages;