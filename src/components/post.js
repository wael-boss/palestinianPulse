
const Post = ({post}) => {
  return (
    <div className="eventContainer">
            <div className="event">
                <div className="eventDate">
                    <p></p>
                    <span></span>
                    <p></p>
                </div>
                <div className="eventTxt">
                    <h1>{post.title.rendered}</h1>
                </div>
            </div>
        </div>
  )
}

export default Post