import { useContext } from 'react'
import DataContext from '../context'
const ErrTab = () => {
  const {error}=useContext(DataContext)
  return (
    <div id="errTab" style={{
      transform:error ? 'translateY(100%)' : ''
    }}>
      <p>{error?.data && error.data}</p>
    </div>
  )
}

export default ErrTab