
const Post = ({post}) => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    // [month ,date ,year]
    const dateArr=post.eventDate==="Invalid Date" ? post.eventDate.toLocaleDateString("en-US").split("/") : post.postDate.toLocaleDateString("en-US").split("/")
    return (
        <div className="eventContainer">
                <div className="event">
                    {dateArr[0]!=="Invalid Date" &&<div className="eventDate">
                        <p>{monthNames[dateArr[0]-1].slice(0 ,3)}</p>
                        <span>{dateArr[1]}</span>
                        <p>{dateArr[2]}</p>
                    </div>}
                    <div className="eventTxt">
                        <h1>{post.title}</h1>
                    </div>
                </div>
            </div>
    )
}

export default Post