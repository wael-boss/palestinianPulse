import { useContext } from "react";
import ErrTab from "./components/errTab";
import Main from "./components/main";
import MoreInfoPopUp from "./components/moreInfoPopUp";
import DataContext from "./context";
import LoadingBar from "./components/loadingBar";


function App() {
  const {moreInfo}=useContext(DataContext)
  return (
    <div className="App">
      <LoadingBar/>
      <ErrTab/>
      {!!moreInfo &&<MoreInfoPopUp/>}
      <Main/>
    </div>
  );
}

export default App;
