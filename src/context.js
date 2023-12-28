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
    const [posts ,setPosts]=useState(JSON.parse(sessionStorage.getItem('posts')) || {
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
    const [lang ,setLang]=useState(localStorage.getItem('defaultLang') || null)
    const [error ,setError]=useState(null)
    const [moreInfo ,setMoreInfo]=useState(null)
    const [loading ,setLoading]=useState(null)
    const clearTextFromHtml=(text)=>{
        if(!text) return ""
        return text.replace(/<[^>]*>|&#(\d+);/g, '');
    }
    const postsFormat=(posts)=>{
        let result=[]
        posts.map((post)=>{
            return result.push({
                id:post.id,
                title:post.title.rendered,
                postDate:post.date,
                blocks:post.content.rendered.trim('\n').split('\n\n\n\n')
            })
        })
        return result
    }
    const getNextPosts=async()=>{
        console.log('getting posts')
        console.log(posts ,lang)
        const URL=`https://palestine.abdel-alim.com/wp-json/wp/v2/posts?categories=${lang==="ENG" ? 3 : lang==="AR" ? 4 : ''}&page=${posts[lang].nextPage}&per_page=${maxPostsPerPage}`
        try{
            console.log('t')
            const data=await axios.get(URL)
            console.log('e')
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
            if(err.code==="rest_post_invalid_page_number"){
                // the maxPostsPerPage is over the posts left || reached the end
            }
            errorFormat(err)
        }finally{
            setLoading(null)
        }
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !loading) {
                    setLoading(prev=>{
                        if(!prev){
                            return "getPosts"
                        }else{
                            return prev
                        }
                    })
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
            if(arabicCountryCodes.includes(response.data.country_code)){
                localStorage.setItem("defaultLang" ,"AR")
                setLang('AR')
            }else{
                localStorage.setItem("defaultLang" ,"ENG")
                setLang('ENG')
            }
        }catch(err){
            setLang('AR')
            errorFormat(err ,"couldn't aquire default language")
        }finally{
            setLoading(null)
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
        switch(loading){
            case"getPosts":
                if(!lang) break
                getNextPosts()
                break;
            case"getDefaultLang":
                getLangByIp()
                break;
            default:
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading])
    useEffect(()=>{
        if(!lang) setLoading("getDefaultLang")
        observer.observe(document.getElementById('nextPageTrigger'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(!lang) return
        if(!posts[lang].data.length) setLoading("getPosts")
        langPageFormat() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lang])
    useEffect(()=>{
        sessionStorage.setItem("posts" ,JSON.stringify(posts))
    },[posts])
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
        loading ,getNextPosts ,posts ,error ,setLang ,lang ,moreInfo ,setMoreInfo ,clearTextFromHtml
        }}>
          {children}
      </DataContext.Provider>
  )
  }
  export default DataContext