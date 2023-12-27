import { useContext } from "react"
import Post from "./post"
import DataContext from "../context"
import LoadingPosts from "./loadingPosts"

const TimeLine = () => {
    const {posts ,lang}=useContext(DataContext)
    return (
        <>
        {posts[lang+'']?.isEmpty ?
        <p id="emptyPosts">the selected options contain no results</p> :
        <div id="timeLineContainer">
            {posts[lang+'']?.data.length ? 
                    posts[lang+''].data.sort((a ,b)=>{
                    const aTime=isNaN(a.eventDate.getTime()) ? a.postDate.getTime() : a.eventDate.getTime()
                    const bTime=isNaN(b.eventDate.getTime()) ? b.postDate.getTime() : b.eventDate.getTime()
                    return bTime-aTime  
                    }).map(post=>{
                        return <Post
                                    key={post.id}
                                    post={post}
                                />
            }): 
                <LoadingPosts/>
            }
            <div id="nextPageTrigger" className="eventContainer loading">
                <div className="event">
                    <div className="eventDate">
                        <p>Oct</p>
                        <span>23</span>
                        <p>2004</p>
                    </div>
                    <div className="eventTxt">
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestias harum animi velit quis inventore iste adipisci perferendis nisi nulla!</h1>
                    </div>
                </div>
            </div> 
        </div>
        }
        </>
    )
}
export default TimeLine