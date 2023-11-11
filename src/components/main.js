import Hero from "./hero"
import TimeLine from "./timeLine"

const Main = () => {
  return (
    <div id="pageView">
      <Hero/>
      <section id="timeLineSection">
        <TimeLine/>
      </section>
    </div>
  )
}

export default Main