import Routers from "./Router";
import IpFounder from "./components/IpFounder";
const App = () => {
  return (
    <div className="flex w-full">
      <IpFounder />
      <Routers />
    </div>
  );
};

export default App;
