import { useContext } from "react"
import DataContext from "../context"

const LoadingBar = () => {
    const {loading}=useContext(DataContext)
  return (
    <div style={{transform:!loading ? "translateY(-100%)" : "translateY(0%)"}} id="topLoadingBar">
        <div></div>
    </div>
  )
}

export default LoadingBar