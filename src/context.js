import axios from "axios"
import { createContext, useEffect, useState } from "react"
const DataContext=createContext({})
export const DataProvider=({children})=>{
    const arabicCountryCodes = [
        'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY',
        'MR', 'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE'
      ]
    let isLoading=false
    const [posts ,setPosts]=useState([])
    const [lang ,setLang]=useState(null)
    const [error ,setError]=useState(null)
    const [moreInfo ,setMoreInfo]=useState(null)
    const postsFormat=(posts)=>{
        let result=[]
        posts.map((post)=>{
            const blocks=post.content.rendered.trim('\n').split('\n\n\n\n')
            // find p block that holds the event date no mater the placement
            const dateBlock=blocks.find(block=>(isNaN(new Date(block.slice(block.indexOf(">")+1 ,-4)).getTime())))
            // check if a date block exists or not
            const eventDate=!dateBlock ? "" : dateBlock.slice(dateBlock.indexOf(">")+1 ,-4)
            return result.push({
                id:post.id,
                title:post.title.rendered,
                eventDate:new Date(eventDate),
                postDate:new Date(post.date),
                blocks:blocks
            })
        })
        return result
    }
    const getPosts=async()=>{
        const URL="https://palestine.abdel-alim.com/wp-json/wp/v2/posts"
        try{
            const data=await axios.get(URL)
            setPosts(postsFormat(data.data))
        }catch(err){
            errorFormat(err)
        }
    }
    const defaultLang=async()=>{
        isLoading=true
        try{
            const ip=await axios.get('https://api.ipify.org')
            const ipData=await axios.get(`http://ip-api.com/json/${ip.data}`)
            console.log(ipData.data.countryCode)
            if(arabicCountryCodes.includes(ipData.data.countryCode)) return setLang('AR')
            setLang('ENG')
        }catch(err){
            setLang('AR')
            errorFormat(err ,"couldn't aquire default language")
        }finally{
            isLoading=false
        }
    }
    const errorFormat=(err ,message=null)=>{
        console.log(err)
        setError({data:message!==null ? message : err.response?.data.message ? err.response?.data.message : err.message,time:Date.now()})
    }
    const langPageFormat=()=>{
        const root = document.documentElement;
        if(lang==="AR"){
            root.style.setProperty('--langAlign', 'right');
        }else if(lang==="ENG"){
            root.style.setProperty('--langAlign', 'left');
        }else{

        }
    }
    useEffect(()=>{
        if(!lang && !isLoading) defaultLang()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(!lang) return 
        getPosts()
        langPageFormat()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const intersecting = entry.isIntersecting
          if (intersecting) {
            entry.target.classList.replace('observed', 'visible');
        }
    });
    })
    useEffect(()=>{
        const containers = document.querySelectorAll('.observed');
        containers.forEach(container=>observer.observe(container))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[posts])
  return(
      <DataContext.Provider value={{
            posts ,error ,setLang ,lang ,moreInfo ,setMoreInfo
        }}>
          {children}
      </DataContext.Provider>
  )
  }
  
  export default DataContext