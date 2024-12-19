import Header from "../../shareComponents/Header/Header"
import pendingImg from '../../assets/images/bro.svg'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { pendingRequestInfo } from "../../interfaces/interfaces";
import SearchInput from "../../shareComponents/SearchInput/SearchInput";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

import { IoDocumentOutline } from "react-icons/io5";
import Modal from 'react-bootstrap/Modal';
import Dropdown from "react-bootstrap/Dropdown";
import { BsImage } from "react-icons/bs";
import DeleteConfirm from "../../shareComponents/DeleteConfirm/DeleteConfirm";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const CourtList = () => {

    const [pendingInfo, setPendingInfo] = useState <pendingRequestInfo[]>([])
    const [searchedKeyword, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState <string|null|undefined>(null)
    const [searchedItem, setSearchedItem] = useState('')
    const [sort, setSort] = useState('')
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ownerName] = useState('');
    const [courtName] = useState('');
    const [courtImage] = useState('');
    const [idNum] = useState('');
    const [deletedId, setDeleteId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
  

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = pendingInfo?.slice(indexOfFirstPost,indexOfLastPost)

    const handleClose = () => {setShow(false);
      setShowDelete(false)
    }
 


  const handleDelete =(id:string)=>{
    setShowDelete(true)
    setDeleteId(id)
  }






 const sortingFunction = (sorting:string) =>{
  sortedItem(searchedItem,sorting)
  setSort(sorting)
  

 }
const deletePendingRequest = () => {

  axios.delete(`http://localhost:3000/courtList/${deletedId}`).then((resp)=>{
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
      axios.get(`http://localhost:3000/courtList?_sort=${searchedItem}&${sorting}`,{
 

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
        
<Header  title={'Courts List'} img={pendingImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<SearchInput from={'court'} currentPost={currentPost} pendingInfo={pendingInfo} postsPerPage={postsPerPage} setCurrPage={setCurrentPage} setSearch={setSearch} sortingFunction={sortingFunction} filteredItem={filteredItem} />



   <div className="pendingTable">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex align-items-center"><span>Company Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('courtName',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-courtName',sort)}/></span></div> </th>
        <th  scope="col">Image </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Price</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('-Price',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('Price',sort)}  /></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Description</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('Description',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-Description',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Court Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('ownerName',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-ownerName',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Category</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('category',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-category',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Status</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('status',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-status',sort)}/></span></div> </th>
        <th className="lastTh" scope="col"><div className="d-flex align-items-center"><span>ID number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('-idNumber',sort)}/> <IoIosArrowDown  onClick={()=>sortedItem('idNumber',sort)}/></span></div> </th>
  
  
  
      </tr>
    </thead>
   

   {
 <>
          <tbody>
  
  {
    currentPost?.filter((item)=>{

        if(searchedKeyword.toLocaleLowerCase()==='') {
            return item
            
        }
        else if(item.courtName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.courtName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.ownerName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.ownerName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
            
        }
        else if(item.status.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.status.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.Description.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.Description.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        
        else if(item.Price.toString().includes(searchedKeyword)) {
            return item.Price.toString().includes(searchedKeyword)
        }
        
   

        

 }).map((info:pendingRequestInfo)=>      <tr key={info.id}>
    <td scope="row">
        <p>{getHighlightedText(info.courtName,searchedKeyword)}</p>
     
    </td>

    <td><div className="pendimage"><img src={info.image} alt="football yard" /></div></td>
    <td>{getHighlightedText(info?.Price?.toString(),searchedKeyword)}</td>
    <td>{getHighlightedText(info.Description,searchedKeyword)}</td>
    <td>{getHighlightedText(info.ownerName,searchedKeyword)}</td>
    <td>{getHighlightedText(info.category,searchedKeyword)}</td>
    <td ><span className={info.status == 'Active' ? `pendingStatus bg-success` : info.status == 'Pending' ? `pendingStatus bg-black` : `pendingStatus bg-danger` }>{info.status}</span></td>
    <td >
      <div className="d-flex align-items-center">
      {info.idNumber}    <Dropdown>
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
       
            <Link className="infoLink" to={`/court-details/${info.id}`}>
            
            <MdOutlineRemoveRedEye  size={'1.2rem'} className="actionsIcon eye"/>View
            </Link>
            <span className="sr-only">click to view</span>
    

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



    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered  size="xl" show={show} onHide={handleClose}>
      <Modal.Header className="justify-content-center headerInfo pb-1 " >
        <Modal.Title className="modalTitle"><span className="titleOfHeader position-relative">Request details</span></Modal.Title>
        <span onClick={handleClose} className="position-absolute  cancelModal"><i className="fa-solid fa-xmark fa-1x"></i></span>
      </Modal.Header>
      <Modal.Body >
<div className="d-flex  justify-content-between gap-5">
<div className="inputs d-flex flex-column justify-content-between w-50">
<div className="coolinput">
  <label htmlFor="input" className="text">Name:</label>
  <input disabled type="text" value={ownerName}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">CourtName:</label>
  <input disabled type="text" value={courtName}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Submit date:</label>
  <input disabled type="text" value={'9/7/2024'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Location:</label>
  <input disabled type="text" value={'Alseeb,oman'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">National number:</label>
  <input disabled type="text" value={'#2356589'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Id number:</label>
  <input disabled type="text" value={idNum}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Registration number:</label>
  <input disabled type="text" value={'95432687125'}  className="form-control modalInputs"/>
</div>
</div>

<div className="owner d-flex flex-column align-items-center">
<div className="ownerImg">
<img src={courtImage} alt="" />
</div>
<div className="ownerBtns d-flex gap-2 ">
<button className="btn border modalBtn"><IoDocumentOutline />
View Document
</button>
<button className="btn border modalBtn"><BsImage />

View court photos
</button>
</div>

<div className="recject-accept d-flex flex-row ">
<button className="btn btn-outline-danger" >Rejcet request</button>
<button className="btn acceptBtn" >Accept request</button>
</div>
</div>
</div>

        
      </Modal.Body>

    </Modal>
    </>

   }

  </table>
          </div>
          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  <DeleteConfirm DeletedItem={deletePendingRequest} show={showDelete} handleClose={handleClose} title={"Delete this court?"}/>
  </div>


    </div>

</>
}

export default CourtList
