import { useContext, useRef } from "react"
import Hero from "./hero"
import TimeLine from "./timeLine"
import {HiLanguage} from 'react-icons/hi2'
import DataContext from "../context"
const Main = () => {
  const {setLang ,lang}=useContext(DataContext)
  const langToggleRef=useRef()
  const toggleHistory=[false]
  return (
    <div id="pageView">
      <div id="langToggle">
        <button ref={langToggleRef}
          onBlur={()=>toggleHistory.push(false)}
          onClick={()=>{
            if(toggleHistory[toggleHistory.length-1]){
              langToggleRef.current.blur()
            }else{
              toggleHistory.push(true)
            }
        }}>
          <HiLanguage/>
          <p onClick={()=>{if(lang!=="ENG") setLang('ENG');langToggleRef.current.blur()}}>ENG</p>
          <p onClick={()=>{if(lang!=="AR") setLang('AR');langToggleRef.current.blur()}}>AR</p>
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