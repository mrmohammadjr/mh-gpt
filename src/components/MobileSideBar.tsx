import React, { useState } from "react";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { FaRegWindowClose } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import Logo from "../assets/New Project.png";
import { clearMessages } from "../data/db";
import { useTranslation } from "react-i18next";
interface Structure {
  id: number;
  role: "user" | "ai";
  message: string;
}
type SidebarProps = {
  setReqRes: React.Dispatch<React.SetStateAction<Structure[]>>;
};
const MobileSideBar = ({ setReqRes }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const handleClearChat = async () => {
    try {
      await clearMessages();
      setReqRes([]);
    } catch (error) {
      console.error("Failed to clear chat:", error);
    }
  };
  function changeLang(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    changeLanguage(value)
  }
  return (
    <div className="bg-[#393E46] p-2 lg:hidden sm:block max-sm:block md:block">
      <TbLayoutSidebarLeftCollapseFilled
        className="text-3xl bg-[#393E46]  text-white"
        onClick={() => setShowSidebar(true)}
      />

      <div
        className={`top-0 left-0 bg-[#393E46] w-[30%] h-[100vh] lg:hidden flex-col sm:flex max-sm:flex fixed z-20 ease-in-out duration-300 ${
          showSidebar ? "shadows translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-around items-center">
          <FaRegWindowClose
            className="mt-2.5 ml-1.5 text-2xl text-white items-center cursor-pointer"
            onClick={() => setShowSidebar(false)}
          />
        </div>

        <div className="flex justify-between items-center px-1.5 pt-2.5">
          <div className="flex justify-start">
            <img src={Logo} alt="logo" className="lg:w-7 sm:w-5 h-5" />
            <h1 className="text-white sm:text-sm">MH-GPT</h1>
          </div>
          <div className="flex justify-center items-center text-white gap-5">
            <TbNewSection
              className="text-2xl hover:text-cyan-500 cursor-pointer"
              onClick={() => {
                setReqRes([]);
                setShowSidebar(false);
              }}
            />
            <FaTrash
              onClick={handleClearChat}
              className="hover:text-cyan-500 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <select onChange={changeLang} name="" id="" className="text-white" value={language}>
            <option value="en" className="text-blue-500">
              english
            </option>
            <option value="fa" className="text-green-500">
              persian
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MobileSideBar;
