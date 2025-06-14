import React from "react";
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
const Sidebar = ({ setReqRes }: SidebarProps) => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  function changeLang(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    changeLanguage(value);
  }
  const handleClearChat = async () => {
    try {
      await clearMessages();
      setReqRes([]);
    } catch (error) {
      console.error("Failed to clear chat:", error);
    }
  };
  return (
    <div className="bg-[#393E46] w-[15%] h-[100vh] lg:flex flex-col sm:hidden max-sm:hidden">
      <div className="lg:flex lg:justify-between  items-center px-1.5 pt-2.5">
        <div className="lg:flex lg:justify-start">
          <img src={Logo} alt="logo" className="lg:w-7 sm:w-5 h-5" />
          <h1 className="text-white sm:text-sm">MH-GPT</h1>
        </div>
        <div className="flex justify-between text-white gap-5 items-center  ">
          <TbNewSection
            className="text-2xl hover:text-cyan-500 cursor-pointer"
            onClick={() => setReqRes([])}
          />
          <FaTrash
            onClick={handleClearChat}
            className=" hover:text-cyan-500 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <select
          onChange={changeLang}
          name=""
          id=""
          className="text-white"
          value={language}
        >
          <option value="en" className="text-blue-500">
            english
          </option>
          <option value="fa" className="text-green-500">
            persian
          </option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
