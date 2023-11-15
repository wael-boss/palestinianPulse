
const Hero = () => {
  return (
    <section id="heroSection" style={{padding:0}}>
        <video
          src="edit.mp4"
          autoPlay
          loop
          muted
          disablePictureInPicture
        />
        <img
        src="palestineFlag.png"
        alt="palestine-flag"
        onClick={()=>window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })}
        />
    </section>
  )
}

export default Hero