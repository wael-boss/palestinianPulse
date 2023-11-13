import { useContext } from "react"
import Post from "./post"
import DataContext from "../context"
import LoadingPosts from "./loadingPosts"

const TimeLine = () => {
    const {posts}=useContext(DataContext)
    return (
      <div id="timeLineContainer">
          {posts.sort((a ,b)=>{
              const aTime=isNaN(a.eventDate.getTime()) ? a.postDate.getTime() : a.eventDate.getTime()
              const bTime=isNaN(b.eventDate.getTime()) ? b.postDate.getTime() : b.eventDate.getTime()
          return bTime-aTime  
          }).map(post=>{
              return <Post
                          key={post.id}
                          post={post}
                      />
          })}
          {!posts.length && <LoadingPosts/>}
      </div>
    )
}

export default TimeLine