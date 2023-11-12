import { useContext } from "react"
import Hero from "./hero"
import TimeLine from "./timeLine"
import {HiLanguage} from 'react-icons/hi2'
import DataContext from "../context"
const Main = () => {
  const {setLang ,lang}=useContext(DataContext)
  return (
    <div id="pageView">
      <div id="langToggle">
        <button type="button">
          <HiLanguage/>
          <p onClick={()=>{if(lang!=="ENG") setLang('ENG')}}>ENG</p>
          <p onClick={()=>{if(lang!=="AR") setLang('AR')}}>AR</p>
        </button>
      </div>
      <Hero/>
      <section id="timeLineSection">
        <TimeLine/>
      </section>
    </div>
  )
}

export default Main