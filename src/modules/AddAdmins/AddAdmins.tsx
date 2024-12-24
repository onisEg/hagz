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
import ViewTopUser from "../../shareComponents/viewTopUser/ViewTopUser";
import { Link } from "react-router-dom";

const AddAdmins = () => {

    const [pendingInfo, setPendingInfo] = useState <topUser[]>([])
    const [searchedKeyword, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState <string|null|undefined>(null)
    const [searchedItem, setSearchedItem] = useState('')
    const [sort, setSort] = useState('')
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ownerName,setOwnerName] = useState('');
    const [role,setRole] = useState('');
    const [courtImage,setCourtImage] = useState('');
    const [idNum,setIdNum] = useState('');
    const [totalPlayed,setTotalPlayed] = useState('');
    const [deletedId, setDeleteId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
 

    const handleShow = (role:string,ownerName:string,img:string,idNumber:string,deletedId:string,totalPlayed:string,phone:string) => {
      setShow(true);
      setCourtImage(img)
      setRole(role)
      setOwnerName(ownerName)
      setIdNum(idNumber)
      setDeleteId(deletedId)
      setTotalPlayed(totalPlayed)
      setPhoneNumber(phone)
    }




 const sortingFunction = (sorting:string) =>{
  sortedItem(searchedItem,sorting)
  setSort(sorting)
  console.log(sorting);
  

 }
const deletePendingRequest = () => {

  axios.delete(`http://localhost:3000/Add_Admins/${deletedId}`).then((resp)=>{
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
      axios.get(`http://localhost:3000/Add_Admins?_sort=${searchedItem}&${sorting}`,{
 

      }).then((resp)=>{
        console.log(resp);
        
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
        
<Header  title={'Add Admins'} img={userImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<SearchInput from={'court'} currentPost={currentPost} pendingInfo={pendingInfo} postsPerPage={postsPerPage} setCurrPage={setCurrentPage} setSearch={setSearch} sortingFunction={sortingFunction} filteredItem={filteredItem} />



   <div className="pendingTable">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex justify-content-center align-items-center"><span>Admins</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('name',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-name',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex justify-content-center align-items-center"><span>ID number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('-IdNumber',sort)}/> <IoIosArrowDown  onClick={()=>sortedItem('IdNumber',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex justify-content-center align-items-center justify-content-center"><span>Role</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('upComing',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-upComing',sort)}/></span></div> </th>
        <th className="lastTh" scope="col"><div className="d-flex justify-content-center align-items-center justify-content-center"><span>Phone Number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('playedMatches',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-playedMatches',sort)}/></span></div> </th>
  
  
  
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
        else if(item?.userName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item?.userName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.idNumber.toString().includes(searchedKeyword)) {
            return item.idNumber.toString().includes(searchedKeyword)
            
        }
        else if(item.role.toString().includes(searchedKeyword)) {
            return item.role.toString().includes(searchedKeyword)
        }
        else if(item.phoneNumber.toString().includes(searchedKeyword)) {
            return item.phoneNumber.toString().includes(searchedKeyword)
        }
        
     
   

        

 }).map((info)=>      <tr key={info.id}>
    <td scope="row">
    <div className="d-flex justify-content-center align-items-center">
      <span className="rank">
         {info.rank}
      </span>
      <div className="user topUsersImage d-flex align-items-center">
          <img src={info.image} alt="" className="mx-2" />
          <p className="my-0">{getHighlightedText(info?.userName,searchedKeyword)}</p>
      </div>
      </div>     
    </td>

    <td>{getHighlightedText(info?.idNumber,searchedKeyword)}</td>
    <td>{getHighlightedText(info.role,searchedKeyword)}</td>
    <td>

        <div className="d-flex justify-content-center align-items-center">
        {getHighlightedText(info.phoneNumber,searchedKeyword)}
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
          <Dropdown.Item onClick={()=>handleShow(info.role,info.userName,info.image,info.idNumber,info.id.toLocaleString(),info.playedMatches,info.phoneNumber)}>
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
          <ViewTopUser role={role} from="addAdmin" id={1} phoneNumber={phoneNumber} show={show} handleClose={handleClose} image={courtImage} idNumber={idNum} name={ownerName} playedMatches={totalPlayed} />

          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>
          <div className="w-50 mx-auto my-4">
          <Link to={'/add-admins-form'} className="btn w-100 text-white saveEdit py-2">

            Add New Admin
          </Link>

          </div>
  <DeleteConfirm DeletedItem={deletePendingRequest} show={showDelete} handleClose={handleClose} title={"Delete this user?"}/>
  </div>


    </div>

</>
}

export default AddAdmins
