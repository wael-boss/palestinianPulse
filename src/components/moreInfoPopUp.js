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
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore perferendis ex optio quasi eligendi accusantium provident facere quos repudiandae consequatur ullam dicta consequuntur harum sint expedita, inventore deserunt voluptatum minima praesentium modi libero veritatis. Numquam pariatur eligendi ea dolorem recusandae debitis laudantium reprehenderit cum obcaecati nostrum optio cumque cupiditate suscipit, quis explicabo, non culpa repellendus accusamus rerum, totam quam sed perspiciatis quisquam distinctio! Temporibus exercitationem commodi recusandae possimus, ipsa, nemo alias quod tempora esse, nostrum dolor! Illo ratione laboriosam sed alias quasi placeat asperiores magni tenetur blanditiis recusandae eos quas amet commodi eaque nemo quos, aliquam officiis corrupti veritatis assumenda, mollitia quibusdam molestias sint expedita? Id illum quisquam rem. Tempora voluptas vero laudantium ut, accusamus reprehenderit incidunt est amet quaerat et repudiandae excepturi illo tenetur neque labore eos, ab omnis voluptate. Laudantium cupiditate voluptatum quidem, voluptates fugiat error itaque qui accusantium iusto magni dolorem? Sapiente voluptate ducimus molestias pariatur officia neque. Iusto vero rem perferendis possimus minus aspernatur culpa? Fuga nesciunt, ad officiis expedita exercitationem ullam libero soluta ducimus iste corporis quos ea cum praesentium assumenda doloribus dolores, doloremque nisi facilis porro laborum laudantium deserunt consectetur blanditiis voluptate. Sit vitae nobis laudantium, sed obcaecati ut ex et vel quod error!</p>
            </div>
        </div>
    </div>
  )
}

export default MoreInfoPopUp