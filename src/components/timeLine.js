import { useContext } from "react"
import Post from "./post"
import DataContext from "../context"
import LoadingPosts from "./loadingPosts"

const TimeLine = () => {
    const {posts ,lang}=useContext(DataContext)
    const dateClass=(date)=>{
        return new Date(date)
    }
    return (
        <>
        {posts[lang+'']?.isEmpty ?
        <p id="emptyPosts">the selected options contain no results</p> :
        <div id="timeLineContainer">
            {posts[lang+'']?.data.length ? 
                    posts[lang+''].data.sort((a ,b)=>{
                        return dateClass(b.postDate).getTime()-dateClass(a.postDate).getTime()  
                        }).map(post=>{
                            post.postDate=dateClass(post.postDate)
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