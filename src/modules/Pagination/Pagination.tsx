import { Dispatch, SetStateAction } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { pendingRequestInfo } from '../../interfaces/interfaces';


interface pages {
  totalPosts :pendingRequestInfo[]  ,
  postsPerPage:number,
  currentPosts: pendingRequestInfo[]|undefined,
  currentPage:number,
  setCurrentPage : Dispatch<SetStateAction<number>>
}
const Pagination:React.FC<pages> = ({totalPosts , postsPerPage ,currentPosts,currentPage,setCurrentPage}) => {




  const nextBtn = ()=>{

    if(currentPage < Math.ceil(totalPosts?.length/postsPerPage)) {
      setCurrentPage(currentPage+1)
    }
console.log(currentPosts);

  }

  const prevBtn = ()=> {
    if(currentPage>1 )
    setCurrentPage(currentPage-1)
  }





  const pageNumbers=[]
  for(let i=1 ; i <= Math.ceil(totalPosts?.length / postsPerPage) ; i++) {
    pageNumbers.push(i)
  }
  return (
    <div className='my-1 prevent-select'>
        <nav aria-label="Page navigation example ">
  <ul className="pagination justify-content-end align-items-center">

    showing
    <Dropdown>
      <Dropdown.Toggle className='paginationDropDown mx-2'  variant="transparent" id="dropdown-basic">
      
      {currentPage } < MdOutlineKeyboardArrowDown/>
      </Dropdown.Toggle>

      
      <Dropdown.Menu>
{pageNumbers.map((page,indx)=>        <Dropdown.Item key={indx}  onClick={()=>setCurrentPage(page)} href="#/action-1">{page}</Dropdown.Item>
)} 
      </Dropdown.Menu>
      of {Math.ceil(totalPosts?.length/postsPerPage)} Pages
  
    </Dropdown>

   <div className='mx-3  '>
    page {currentPage}
    <span className='mx-2'>of</span> {Math.ceil(totalPosts?.length/postsPerPage)}
   </div>

<div>
  <MdOutlineKeyboardArrowLeft className='paginationLinks' size={'1.5rem'} onClick={prevBtn} />
<MdOutlineKeyboardArrowRight className='paginationLinks' size={'1.5rem'} onClick={nextBtn}/>

</div>
   
  </ul>
</nav>
    </div>
  )
}

export default Pagination
