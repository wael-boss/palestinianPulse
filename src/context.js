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
    const getPosts=async()=>{
        const URL="https://palestine.abdel-alim.com/wp-json/wp/v2/posts"
        try{
            const response=await fetch(URL)
            const data=await response.json()
            console.log(data)
            setPosts(data)
        }catch(err){
            console.log(err)
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
            console.log(err)
        }
    }
    useEffect(()=>{
        defaultLang()
    },[])
    useEffect(()=>{
        if(!lang) defaultLang()
        // include lang format when available
        getPosts()
    },[lang])
  return(
      <DataContext.Provider value={{
            getPosts ,posts
        }}>
          {children}
      </DataContext.Provider>
  )
  }
  
  export default DataContext