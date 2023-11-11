import { useContext } from "react"
import Post from "./post"
import DataContext from "../context"

const TimeLine = () => {
    const {getPosts ,posts}=useContext(DataContext)
  return (
    <div id="timeLineContainer">
        {posts.map(post=>{
            return <Post
                        key={post.id}
                        post={post}
                    />
        })}
    </div>
  )
}

export default TimeLine