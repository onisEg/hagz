import Header from "../../shareComponents/Header/Header"
import pendingImg from '../../assets/images/rafiki.svg'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { pendingRequestInfo } from '../../interfaces/interfaces';
import SearchInput from "../../shareComponents/SearchInput/SearchInput";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";


import Dropdown from "react-bootstrap/Dropdown";
import DeleteConfirm from "../../shareComponents/DeleteConfirm/DeleteConfirm";
import Pagination from "../Pagination/Pagination";
import ViewModal from "../../shareComponents/ViewModal/ViewModal";
import { searchContext } from "../../Context/SearchContext";


export interface searchCont {
  pendingInfo : pendingRequestInfo[],
  postsPerPage:number,
  currentPost: pendingRequestInfo[],
  sortingFunction: (param:string)=>void,
  setSearch : React.Dispatch<React.SetStateAction<string>> ,
  setPendingInfo :React.Dispatch<React.SetStateAction<pendingRequestInfo[]>>,
  setFilteredItem :React.Dispatch<React.SetStateAction<string|null|undefined>>,
  setSearchedItem :React.Dispatch<React.SetStateAction<string>>,
  setCurrentPage :React.Dispatch<React.SetStateAction<number>>,
  filteredItem :string|null|undefined,
  sort : string,
  currentPage:number,
  searchedKeyword:string,
  getHighlightedText:(param:string,param2:string)=>ReactNode

}
const PendingRequest = () => {

  const sortedItem = (searchedItem:string,sorting:string)=> {
    axios.get(`http://localhost:3000/pendingTableInfo?_sort=${searchedItem}&${sorting}`,{


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


  const {pendingInfo,postsPerPage,currentPost,sortingFunction,setSearch,filteredItem,currentPage,searchedKeyword,sort,setPendingInfo,setFilteredItem,setSearchedItem,setCurrentPage,getHighlightedText} = useContext<searchCont>(searchContext)

  


    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [courtName, setCourtName] = useState('');
    const [courtImage, setCourtImage] = useState('');
    const [idNum, setIdNum] = useState('');
    const [deletedId, setDeleteId] = useState('');




    const handleClose = () => {setShow(false);
      setShowDelete(false)
    }
    const handleShow = (courtName:string,ownerName:string,img:string,idNumber:string,deletedId:string) => {
      setShow(true);
      setCourtImage(img)
      setCourtName(courtName)
      setOwnerName(ownerName)
      setIdNum(idNumber)
      setDeleteId(deletedId)

    }


  const handleDelete =(id:string)=>{
    setShowDelete(true)
    setDeleteId(id)
  }





const deletePendingRequest = () => {

  axios.delete(`http://localhost:3000/pendingTableInfo/${deletedId}`).then((resp)=>{
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





    useEffect(()=>{
        sortedItem('','')
        
        
    },[]
)


return <>
    <div className="container-fluid">
        
<Header  title={'Pending Requests'} img={pendingImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<SearchInput currentPost={currentPost} pendingInfo={pendingInfo} postsPerPage={postsPerPage} setCurrPage={setCurrentPage} setSearch={setSearch} sortingFunction={sortingFunction} filteredItem={filteredItem} />



   <div className="pendingTable">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex align-items-center"><span>Court Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('courtName',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-courtName',sort)}/></span></div> </th>
        <th  scope="col">Image </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Price</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('-Price',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('Price',sort)}  /></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Description</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('Description',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-Description',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Owner Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('ownerName',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-ownerName',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Category</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('category',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-category',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Status</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('status',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-status',sort)}/></span></div> </th>
        <th className="lastTh" scope="col"><div className="d-flex align-items-center"><span>ID number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('-idNumber',sort)}/> <IoIosArrowDown  onClick={()=>sortedItem('idNumber',sort)}/></span></div> </th>
  
  
  
      </tr>
    </thead>
   

   
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
    <td>{getHighlightedText(info.Price?.toString(),searchedKeyword)}</td>
    <td>{getHighlightedText(info.Description,searchedKeyword)}</td>
    <td>{getHighlightedText(info.ownerName,searchedKeyword)}</td>
    <td>{getHighlightedText(info.category,searchedKeyword)}</td>
    <td ><span className={info.status == 'Approved' ? `pendingStatus bg-success` : info.status == 'Pending' ? `pendingStatus pending` : `pendingStatus bg-danger` }>{info.status}</span></td>
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
          <Dropdown.Item onClick={()=>handleShow(info.courtName,info.ownerName,info.image,info.idNumber,info.id.toLocaleString())}>
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

<ViewModal courtImage={courtImage} idNum={idNum} courtName={courtName} handleClose={handleClose} ownerName={ownerName} show={show}/>

  
    </>

   

  </table>
          </div>
          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  <DeleteConfirm DeletedItem={deletePendingRequest} show={showDelete} handleClose={handleClose} title={"Delete this request?"}/>
  </div>


    </div>

</>
}

export default PendingRequest
