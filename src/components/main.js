import React, { useContext, useMemo } from "react"
import Hero from "./hero"
import DataContext from "../context"
import TimeLine from "./timeLine"
const Main =() => {
  const {setLang ,lang }=useContext(DataContext)
  return (
    <div id="pageView">
        <button
          id="langToggle"
          onClick={()=>{
            if(lang==="AR"){
              setLang("ENG")
            }else{
              setLang("AR")
            }
        }}>
          {!lang ? "" : lang==="ENG" ? "AR" : "ENG"}
        </button>
      <Hero/>
      <section id="timeLineSection">
        <TimeLine/>
      </section>
    </div>
  )
}

export default Main