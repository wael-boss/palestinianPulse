import {IoMdClose} from 'react-icons/io'
import DataContext from '../context'
import { useContext, useEffect, useRef, useState } from 'react'
import {AiOutlineDoubleLeft ,AiOutlineDoubleRight} from 'react-icons/ai'

const MoreInfoPopUp = () => {
  const {moreInfo ,setMoreInfo ,clearTextFromHtml}=useContext(DataContext)
  const [sliderWidth ,setSliderWidth]=useState(null)
  const [scrollAmount ,setScrollAmount]=useState(0)
  const sliderRef=useRef()
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
    if(!!descriptionBlock) resultData.description=descriptionBlock.slice(descriptionBlock.indexOf(">")+1 ,-4)
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
  const handleSliderScroll=(amount ,postion=null)=>{
    const maxScroll=(resultData.imageURLS.length-1)*sliderRef.current.clientWidth
    setScrollAmount(prev=>{
      const target=!!Number(postion+'1') ? postion : prev+amount
      if(target>maxScroll){
        return 0
      }else if(target<0){
        return maxScroll
      }else{
        return target
      }
    })
  }
  useEffect(()=>{
    setSliderWidth(sliderRef.current.clientWidth)
    // key listiner
    const handleKeyDown = (e) => {
      if(e.key==="Escape" && !!moreInfo){
        setMoreInfo(null)
      }else if(e.key==="ArrowRight"){
        handleSliderScroll(+sliderRef.current.clientWidth)
      }else if(e.key==="ArrowLeft"){
        handleSliderScroll(-sliderRef.current.clientWidth)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  },[])
  useEffect(()=>{
    sliderRef.current.scrollTo(
      {
        top: 0,
        left: scrollAmount,
        behavior: "smooth",
      })
      // eslint-disable-next-line
  },[scrollAmount])
  return (
    <div id="moreInfoPage">
        <div id="moreInfoContainer">
            <div id='closeInfo' >
              <IoMdClose onClick={()=>{setMoreInfo(null)}}/>
            </div>
            <div id='moreInfoBox'>
              <div id='textInfo'>
                <h1 >{clearTextFromHtml(resultData.title)}</h1>
                {resultData.date.length>0 && <div id='dateInfo'><p>{resultData.date}</p></div>}
                {resultData.description.length>0 &&<p>{clearTextFromHtml(resultData.description)}</p>}
              </div>
              <div id='imageInfo'>
                <div id='imageSlider' ref={sliderRef}>
                  {resultData.imageURLS.length ? resultData.imageURLS.map((url ,i)=>{
                    return <img src={url} alt='' key={i} loading='lazy' decoding='async'/>
                  }): 
                  <img src='noImg.jpg' alt='no img'/>
                  }
                </div>
                {resultData.imageURLS.length>0 &&
                <div id='imageIndicators'>
                  <AiOutlineDoubleLeft
                    onClick={()=>{
                      handleSliderScroll(-sliderWidth)
                    }}
                  />
                  {resultData.imageURLS.length>0 && !!sliderWidth && resultData.imageURLS.map((url ,i)=>{
                    return <div
                              className='imageIndicator'
                              key={i}
                              style={{
                                backgroundColor:Math.floor(scrollAmount/sliderWidth)===i && "var(--blue)"
                              }}
                              onClick={()=>{
                                handleSliderScroll(null ,sliderWidth*i)
                              }}
                            ></div>
                  })}
                  <AiOutlineDoubleRight
                    onClick={()=>{
                      handleSliderScroll(sliderWidth)
                    }}
                  />
                </div>}
              </div>
            </div>
        </div>
    </div>
  )
}

export default MoreInfoPopUp