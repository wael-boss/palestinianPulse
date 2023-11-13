import {GrClose} from 'react-icons/gr'
import DataContext from '../context'
import { useContext } from 'react'

const MoreInfoPopUp = () => {
  const {moreInfo ,setMoreInfo}=useContext(DataContext)
  window.addEventListener('keydown' ,e=>{
    if(e.key==="Escape" && !!moreInfo){
      setMoreInfo(null)
    }
  })
  const resultData={
    title:'',
    description:'',
    imageURLS:[],
    date:''
  }
  const breakInfoBlock=()=>{
    let blocks=moreInfo.blocks
    // title
    resultData.title=moreInfo.title
    // description
    const descriptionBlock=blocks.find(block=>block.includes('<p>') && (isNaN(new Date(block.slice(block.indexOf(">")+1 ,-4)).getTime())))
    resultData.description=descriptionBlock.slice(descriptionBlock.indexOf(">")+1 ,-4)
    // images
    const imageBlocks=blocks.filter(block=>block.includes('<figure'))
    imageBlocks.map(image=>{
      const splitArr=image.split('src="')
      return resultData.imageURLS.push(splitArr[1].slice(0 ,splitArr[1].indexOf('"')))
    })
    // date
    resultData.date=isNaN(moreInfo.eventDate.getTime()) ? moreInfo.postDate.toLocaleDateString("en-US") : moreInfo.eventDate.toLocaleDateString("en-US")
  }
  breakInfoBlock()
  return (
    <div id="moreInfoPage">
        <div id="moreInfoContainer">
            <GrClose id='closeInfo' onClick={()=>{setMoreInfo(null)}}/>
            <div id='moreInfoBox'>
              <h1>{resultData.title}</h1>
              {resultData.description.length>0 &&<p>{resultData.description}</p>}
              <div id='images'>
                {resultData.imageURLS.length ? resultData.imageURLS.map((url ,i)=>{
                  return <img src={url} alt='' key={i} loading='lazy' decoding='async'/>
                }): 
                <div>empty</div>
                }
              </div>
              {resultData.date.length>0 &&<p id='eventDate'>{resultData.date}</p>}
            </div>
        </div>
    </div>
  )
}

export default MoreInfoPopUp