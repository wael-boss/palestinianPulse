import { useContext } from "react";
import DataContext from "../context";

const Post = ({post}) => {
    const {setMoreInfo ,clearTextFromHtml}=useContext(DataContext)
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    // [month ,date ,year]
    const dateArr=post.postDate.toLocaleDateString("en-US").split("/")
    return (
        <div className="eventContainer observed">
            <div className="event" onClick={()=>{setMoreInfo(post)}}>
                {dateArr[0]!=="Invalid Date" &&<div className="eventDate">
                    <p>{monthNames[dateArr[0]-1].slice(0 ,3)}</p>
                    <span>{dateArr[1]}</span>
                    <p>{dateArr[2]}</p>
                </div>}
                <div className="eventTxt">
                    <h1>{clearTextFromHtml(post.title)}</h1>
                </div>
            </div>
        </div>
    )
}

export default Post