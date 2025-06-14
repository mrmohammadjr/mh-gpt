import { useEffect, useState } from "react";
import Chatroom from "../../components/Chatroom";
import Sidebar from "../../components/Sidebar";
import MobileSideBar from "../../components/MobileSideBar";
interface Structure {
  id: number;
  role: "user" | "ai";
  message: string;
}
const App = () => {
  const [reqRes, setReqRes] = useState<Structure[]>([]);
  useEffect(() => {}, []);

  return (
    <div className="flex w-full">
      <MobileSideBar setReqRes={setReqRes} />
      <Sidebar setReqRes={setReqRes} />
      <Chatroom reqRes={reqRes} setReqRes={setReqRes} />
    </div>
  );
};

export default App;
