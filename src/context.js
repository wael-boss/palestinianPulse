import axios from "axios"
import { cloneDeep } from "lodash"
import { createContext, useEffect, useState } from "react"
const DataContext=createContext({})
export const DataProvider=({children})=>{
    const arabicCountryCodes = [
        'DZ', 'BH', 'KM', 'DJ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY',
        'MR', 'MA', 'OM', 'PS', 'QA', 'SA', 'SO', 'SD', 'SY', 'TN', 'AE', 'YE'
      ]
    const maxPostsPerPage=10
    const [posts ,setPosts]=useState({
        AR:{
            data:[],
            nextPage:1,
            isEmpty:false
        },
        ENG:{
            data:[],
            nextPage:1,
            isEmpty:false
        }
    })
    const [lang ,setLang]=useState(null)
    const [error ,setError]=useState(null)
    const [moreInfo ,setMoreInfo]=useState(null)
    const [isLoading ,setIsLoading]=useState(false)
    const clearTextFromHtml=(text)=>{
        if(!text) return ""
        return text.replace(/<[^>]*>|&#(\d+);/g, '');
    }
    const postsFormat=(posts)=>{
        let result=[]
        posts.map((post)=>{
            const blocks=post.content.rendered.trim('\n').split('\n\n\n\n')
            // find p block that holds the event date no mater the placement
            const dateBlock=blocks.find(block=>(!isNaN(new Date(block.slice(block.indexOf(">")+1 ,-4)).getTime())))
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
    const getNextPosts=async()=>{
        if(!lang || isLoading) return
        console.log('getting posts')
        console.log(posts[lang].nextPage)
        setIsLoading(true)
        const URL=`https://palestine.abdel-alim.com/wp-json/wp/v2/posts?categories=${lang==="ENG" ? 3 : lang==="AR" ? 4 : ''}&page=${posts[lang].nextPage}&per_page=${maxPostsPerPage}`
        try{
            const data=await axios.get(URL)
            if(!data.data.length){
                console.log("empty")
                setPosts(prev=>{
                    let newPosts={...prev}
                    newPosts[lang].isEmpty=true
                    return newPosts
                })
            }else{
                setPosts(prev=>{
                    const newPosts = cloneDeep(prev);
                    console.log(newPosts)
                    newPosts[lang].data=[...newPosts[lang].data ,...postsFormat(data.data)]
                    newPosts[lang].nextPage+=1
                    return newPosts
                })
            }
        }catch(err){
            errorFormat(err)
        }finally{
            setIsLoading(false)
        }
    }
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoading) {
                console.log('ran')
                getNextPosts()
            }
        });
        },{threshold:1}
    );
    const getLangByIp=async()=>{
        try{
            const ip=await axios.request('https://api.ipify.org')
            const options = {
                method: 'GET',
                url: `https://jkosgei-free-ip-geolocation-v1.p.rapidapi.com/${ip.data}`,
                params: {
                  'api-key': 'f8083db68d4aa22cd603e0fb544cbfae1dd44fca2cea8ff123118ddc'
                },
                headers: {
                  'X-RapidAPI-Key': '204c9e1f81msh7d59ffa394f26d2p191336jsnfbbaac2259cc',
                  'X-RapidAPI-Host': 'jkosgei-free-ip-geolocation-v1.p.rapidapi.com'
                }
              };
            const response = await axios.request(options);
            if(arabicCountryCodes.includes(response.data.country_code)) return setLang('AR')
            setLang('ENG')
        }catch(err){
            setLang('AR')
            errorFormat(err ,"couldn't aquire default language")
        }
    }
    const errorFormat=(err ,message=null)=>{
        setError({data:message!==null ? message : err.response?.data.message ? err.response?.data.message : err.message,time:Date.now()})
    }
    const langPageFormat=()=>{
        const root = document.documentElement;
        if(lang==="AR"){
            root.style.setProperty('--langAlign', 'right');
            root.style.setProperty('--langDirection', 'row-reverse');
        }else if(lang==="ENG"){
            root.style.setProperty('--langAlign', 'left');
            root.style.setProperty('--langDirection', 'row');
        }else{

        }
    }
    useEffect(()=>{
        if(!lang) getLangByIp()
        observer.observe(document.getElementById('nextPageTrigger'))
    },[])
    useEffect(()=>{
        if(!lang) return
        if(!posts[lang].data.length) getNextPosts()
        langPageFormat() 
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
        },5000)
    },[error])
    
  return(
      <DataContext.Provider value={{
        getNextPosts ,posts ,error ,setLang ,lang ,moreInfo ,setMoreInfo ,clearTextFromHtml
        }}>
          {children}
      </DataContext.Provider>
  )
  }
  export default DataContext