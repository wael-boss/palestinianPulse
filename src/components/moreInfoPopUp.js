import {GrClose} from 'react-icons/gr'
import DataContext from '../context'
import { useContext } from 'react'

const MoreInfoPopUp = () => {
  const {moreInfo ,setMoreInfo}=useContext(DataContext)
  return (
    <div id="moreInfoPage">
        <div id="moreInfoContainer">
            <GrClose id='closeInfo' onClick={()=>{setMoreInfo(null)}}/>
            <div id='moreInfoBox'>
              <h1>{moreInfo.title}</h1>
              <div dangerouslySetInnerHTML={{__html:moreInfo.block}}/> 
            </div>
        </div>
    </div>
  )
}

export default MoreInfoPopUp