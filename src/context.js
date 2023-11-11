import axios from "axios"
import { createContext, useEffect, useState } from "react"
const DataContext=createContext({})
export const DataProvider=({children})=>{
    const arabicCountryCodes = [
        'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY',
        'MR', 'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE'
      ]
    const [posts ,setPosts]=useState([])
    const [lang ,setLang]=useState(null)
    const [error ,setError]=useState(null)
    const getPosts=async()=>{
        const URL="https://palestine.abdel-alim.com/wp-json/wp/v2/posts"
        try{
            const data=await axios.get(URL)
            console.log(data.data)
            setPosts(data.data)
        }catch(err){
            errorFormat(err)
        }
    }
    const defaultLang=async()=>{
        try{
            const ip=await axios.get('https://api.ipify.org')
            const ipData=await axios.get(`http://ip-api.com/json/${ip.data}`)
            if(arabicCountryCodes.includes(ipData.data.countryCode)) return setLang('AR')
            setLang('ENG')
        }catch(err){
            setLang('AR')
            errorFormat(err)
        }
    }
    const errorFormat=(err ,message=null)=>{
        console.log(err)
        setError({data:message!==null ? message : err.response?.data.message ? err.response?.data.message : err.message,time:Date.now()})
    }
    useEffect(()=>{
        if(!lang) defaultLang()
    },[])
    useEffect(()=>{
        if(!lang) defaultLang()
        // include lang format when available
        getPosts()
    },[lang])
    useEffect(()=>{
        if(!error) return
        setTimeout(()=>{
            // prevent previous error from disabeling newer ones
            setError(prev=>{
                if(prev===null) return null
                const dif=prev.time-Date.now()
                if(dif>100) return prev
                return null
            })
        },3000)
    },[error])
  return(
      <DataContext.Provider value={{
            getPosts ,posts ,error
        }}>
          {children}
      </DataContext.Provider>
  )
  }
  
  export default DataContext