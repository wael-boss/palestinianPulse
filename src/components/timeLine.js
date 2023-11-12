import { useContext } from "react"
import Post from "./post"
import DataContext from "../context"

const TimeLine = () => {
    const {getPosts ,posts}=useContext(DataContext)
    return (
      <div id="timeLineContainer">
          {posts.sort((a ,b)=>{
          const aTime=a.eventDate==="Invalid Date" ? a.postDate.getTime() : a.postDate.getTime()
          const bTime=b.eventDate==="Invalid Date" ? b.postDate.getTime() : b.postDate.getTime()
          return bTime-aTime
          }).map(post=>{
              return <Post
                          key={post.id}
                          post={post}
                      />
          })}
      </div>
    )
}

export default TimeLine