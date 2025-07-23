import Chatroom from "./components/Chatroom";
import IpFounder from "./components/IpFounder";
export default async function Page() {
  return (
    <div className="flex justify-center h-[100vh]">
      <IpFounder />
      <Chatroom />
    </div>
  );
}
