import Header from "../../shareComponents/Header/Header"
import userImg from '../../assets/images/rafiki.png'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { topUser } from '../../interfaces/interfaces';
import SearchInput from "../../shareComponents/SearchInput/SearchInput";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

import Dropdown from "react-bootstrap/Dropdown";
import DeleteConfirm from "../../shareComponents/DeleteConfirm/DeleteConfirm";
import Pagination from "../Pagination/Pagination";
import { FiEdit } from "react-icons/fi";
import ViewTopUser from "../../shareComponents/viewTopUser/ViewTopUser";

const Users = () => {

    const [pendingInfo, setPendingInfo] = useState <topUser[]>([])
    const [searchedKeyword, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState <string|null|undefined>(null)
    const [searchedItem, setSearchedItem] = useState('')
    const [sort, setSort] = useState('')
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ownerName,setOwnerName] = useState('');
    const [totalResv,setTotalResv] = useState('');
    const [courtImage,setCourtImage] = useState('');
    const [idNum,setIdNum] = useState('');
    const [totalPlayed,setTotalPlayed] = useState('');
    const [deletedId, setDeleteId] = useState('');
    const [cancelled, setCancelled] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
  

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = pendingInfo?.slice(indexOfFirstPost,indexOfLastPost)

    const handleDelete =(id:string)=>{
      setShowDelete(true)
      setDeleteId(id)
    }
  
  
  
  
    const handleClose = () => {setShow(false);
      setShowDelete(false)
    }
 

    const handleShow = (totalResv:string,ownerName:string,img:string,idNumber:string,deletedId:string,totalPlayed:string,cancelled:string) => {
      setShow(true);
      setCourtImage(img)
      setTotalResv(totalResv)
      setOwnerName(ownerName)
      setIdNum(idNumber)
      setDeleteId(deletedId)
      setTotalPlayed(totalPlayed)
      setCancelled(cancelled)
    }




 const sortingFunction = (sorting:string) =>{
  sortedItem(searchedItem,sorting)
  setSort(sorting)
  console.log(sorting);
  

 }
const deletePendingRequest = () => {

  axios.delete(`http://localhost:3000/topUsers/${deletedId}`).then((resp)=>{
    console.log(resp);
    setShowDelete(false)
   const filtered = pendingInfo?.filter((array)=> array.id.toLocaleString() !== deletedId)
   setPendingInfo(filtered)
   
   if(  currentPost&& currentPost?.length <=1){
    setCurrentPage(Math.ceil( pendingInfo?.length / postsPerPage)-1)
   }
  }).catch((error)=>{
    console.log(error);
    setShowDelete(false)

    
  })
  

}


    const getHighlightedText = (text:string, highlight:string) => {
        if (!highlight.trim()) return text;
    
        const regex = new RegExp(`(${highlight})`, 'gi');
        
        const parts = text.split(regex);
    
        return parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
              {part}
            </span>
          ) : (
            part
          )
        );
      };
    

    const sortedItem = (searchedItem:string,sorting:string)=> {
      axios.get(`http://localhost:3000/topUsers?_sort=${searchedItem}&${sorting}`,{
 

      }).then((resp)=>{
        setPendingInfo(resp.data)
        if(sorting!=undefined){
          setFilteredItem(sorting.split('=')[1])

          
        }
        else {
          setFilteredItem(null)
        }
        
     
        setSearchedItem(searchedItem)
      })
 
      
    }

    useEffect(()=>{
        sortedItem('','')
        
        
    },[]
)


return <>
    <div className="container-fluid">
        
<Header  title={'Users List'} img={userImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<SearchInput from={'court'} currentPost={currentPost} pendingInfo={pendingInfo} postsPerPage={postsPerPage} setCurrPage={setCurrentPage} setSearch={setSearch} sortingFunction={sortingFunction} filteredItem={filteredItem} />



   <div className="pendingTable">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex justify-content-center align-items-center"><span>Users</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('name',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-name',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex justify-content-center align-items-center"><span>ID number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('-IdNumber',sort)}/> <IoIosArrowDown  onClick={()=>sortedItem('IdNumber',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex justify-content-center align-items-center justify-content-center"><span>Upcoming</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('upComing',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-upComing',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex justify-content-center align-items-center justify-content-center"><span>Matches played</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('playedMatches',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-playedMatches',sort)}/></span></div> </th>
        <th className="lastTh"  scope="col"><div className="d-flex align-items-center justify-content-center"><span>Matches cancelled</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('cancelledMatches',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-cancelledMatches',sort)}/></span></div> </th>
  
  
  
      </tr>
    </thead>
   

   {
    <>
          <tbody>
  
  {
    currentPost?.filter((item:topUser)=>{

        if(searchedKeyword.toLocaleLowerCase()==='') {
            return item
            
        }
        else if(item?.name.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item?.name.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.idNumber.toString().includes(searchedKeyword)) {
            return item.idNumber.toString().includes(searchedKeyword)
            
        }
        else if(item.upComing.toString().includes(searchedKeyword)) {
            return item.upComing.toString().includes(searchedKeyword)
        }
        else if(item.playedMatches.toString().includes(searchedKeyword)) {
            return item.playedMatches.toString().includes(searchedKeyword)
        }
        
        else if(item.cancelledMatches.toString().includes(searchedKeyword)) {
            return item.cancelledMatches.toString().includes(searchedKeyword)
        }
        
   

        

 }).map((info)=>      <tr key={info.id}>
    <td scope="row">
    <div className="d-flex justify-content-center align-items-center">
      <span className="rank">
         {info.rank}
      </span>
      <div className="user topUsersImage d-flex align-items-center">
          <img src={info.image} alt="" className="mx-2" />
          <p className="my-0">{getHighlightedText(info?.name,searchedKeyword)}</p>
      </div>
      </div>     
    </td>

    <td>{getHighlightedText(info?.idNumber,searchedKeyword)}</td>
    <td>{getHighlightedText(info.upComing,searchedKeyword)}</td>
    <td>{getHighlightedText(info.playedMatches,searchedKeyword)}</td>
    <td >
      <div className="d-flex align-items-center justify-content-center">
    {info.cancelledMatches} 
    <Dropdown>
        <Dropdown.Toggle
          className='pendingDropDown'
          variant="transparent"
          id="dropdown-basic"
        >
  <FaEllipsisH 
  />
  <span className="sr-only">click to toggle menu</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>handleShow(info.upComing,info.name,info.image,info.idNumber,info.id.toLocaleString(),info.playedMatches,info.cancelledMatches)}>
            {" "}
            <MdOutlineRemoveRedEye  size={'1.2rem'} className="actionsIcon eye"/>View
            <span className="sr-only">click to view</span>
          </Dropdown.Item>
 

          <Dropdown.Item
     onClick={()=>handleDelete(info.id.toLocaleString())} 
          >
            <FaRegTrashCan onClick={()=>console.log(deletedId)
            }  size={'1.2rem'} className="actionsIcon" />Delete
            <span className="sr-only">click to delete</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
    </td>
  </tr>)
  }
  </tbody>



    </>

   }

  </table>
          </div>
          <ViewTopUser id="1" cancelledMatches={cancelled} show={show} handleClose={handleClose} image={courtImage} idNumber={idNum} name={ownerName} playedMatches={totalPlayed} upComing={totalResv}/>

          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  <DeleteConfirm DeletedItem={deletePendingRequest} show={showDelete} handleClose={handleClose} title={"Delete this user?"}/>
  </div>


    </div>

</>
}

export default Users
