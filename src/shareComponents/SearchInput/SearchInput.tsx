import { CiSearch } from 'react-icons/ci'
import Dropdown from 'react-bootstrap/Dropdown';
import { IoFilterOutline } from "react-icons/io5";
import { Dispatch, SetStateAction } from 'react';
import { pendingRequestInfo } from '../../interfaces/interfaces';


interface search  {
  setSearch : React.Dispatch<React.SetStateAction<string>>,
  sortingFunction : (item:string)=>void,
  filteredItem:string|null|undefined,
  setCurrPage :  Dispatch<SetStateAction<number>>,
  currentPost: pendingRequestInfo[]|undefined,
  postsPerPage:number,
  pendingInfo : pendingRequestInfo[],
  from?:string




}


const SearchInput :React.FC<search> =({setSearch,sortingFunction,filteredItem,setCurrPage,currentPost ,postsPerPage , pendingInfo , from}) => {
  const discardFilter =()=>{
  sortingFunction('null')
  if(  currentPost&& currentPost?.length <=1){
    setCurrPage(Math.ceil( pendingInfo?.length / postsPerPage)-(-1))
   }
  }
  return <>
 
  <div className="searchingTable d-flex gap-3">
    <div className="position-relative w-25 d-flex align-items-center">
    <input onChange={(e)=>setSearch(e.target.value)
    } type="text" placeholder="search here ..."  className='searchTable form-control'/>
    <CiSearch className='position-absolute  mx-3 searchTableIcon' size={'1.2rem'}/>
    </div>
 
    <Dropdown>
      <Dropdown.Toggle variant="transparent" className='border dropTable' id="dropdown-basic">
      <IoFilterOutline />

        {filteredItem == null ?  "Filter" :        <span className='mx-2'>{filteredItem}</span>
 }
      </Dropdown.Toggle>
    {
      filteredItem == null ? '' :    <button   onClick={ discardFilter
      } className='btn-danger btn btn-sm mx-2'>
       x

      </button>
    }
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>sortingFunction(from !=='court' ? "status=Approved" : 'status=Active')}>{from !== 'court' ? 'Approved' : 'Active'}</Dropdown.Item>
        <Dropdown.Item onClick={()=>sortingFunction(from !=='court' ? "status=Pending" : 'status=Deactive')} >{from !== 'court' ? 'Pending' : 'Deactive'}</Dropdown.Item>
        {from !== 'court' ?         <Dropdown.Item onClick={()=>sortingFunction("status=Rejected")}>Rejected</Dropdown.Item>
 :''}
      </Dropdown.Menu>
    </Dropdown>
 </div>
   </>
}

export default SearchInput 
