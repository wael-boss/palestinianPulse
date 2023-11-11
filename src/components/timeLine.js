import { useState } from "react"
import { useEffect } from "react"
import Post from "./post"

const TimeLine = () => {
    const [posts ,setPosts]=useState([])
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
    useEffect(()=>{
        getPosts()
    },[])
  return (
    <div id="timeLineContainer">
        {posts.map(post=>{
            return <Post
            key={post.id}
            post={post}/>
        })}
    </div>
  )
}

export default TimeLine