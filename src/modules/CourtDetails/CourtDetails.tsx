import Header from "../../shareComponents/Header/Header"
import pendingImg from '../../assets/images/bro.svg'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { IoDocumentOutline } from "react-icons/io5"
import { BsImage } from "react-icons/bs"
import { useForm } from "react-hook-form"
import  {  GpsImg } from './../../svgAssests';
import { RiMapPinLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import SearchInput from "../../shareComponents/SearchInput/SearchInput"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import NoData from "../../shareComponents/NoData/NoData"
import { searchCont } from "../PendingRequest/PendingRequest"
import { searchContext } from "../../Context/SearchContext"
import userImg from '../../assets/images/person.jpg'
import Pagination from './../Pagination/Pagination';
import { CourtDet, pendingRequestInfo } from "../../interfaces/interfaces"



const CourtDetails = () => {



  const navigate = useNavigate()

  const {register,handleSubmit}=useForm<CourtDet>()

  const [courtDetails, setCourtDetails] = useState <CourtDet>()
  const {pendingInfo,postsPerPage,currentPost,sortingFunction,setSearch,filteredItem,currentPage,searchedKeyword,sort,setPendingInfo,setFilteredItem,setSearchedItem,setCurrentPage,getHighlightedText} = useContext<searchCont>(searchContext)

  useEffect(()=>{
    getCourtDetails()
  },[])
  const myParams=useParams()
  const id = myParams.id

  const getCourtDetails =()=>{
    axios.get(`http://localhost:3000/courtList/${id}`).then((resp)=>{
      console.log(resp.data);

      setCourtDetails(resp?.data)
    }).catch((error)=>{
      console.log(error);
      
    })

 



 
  }
  const onSubmitHandler=(data:CourtDet)=>{
    axios.patch(`http://localhost:3000/courtList/${id}`,{
      ...data
    }).then((response)=>{
      console.log(response);
      navigate('/court-list')
    }).catch((error)=>{
      console.log(error);
      
    })
    console.log(data);
   
  }


   const sortedItem = (searchedItem:string,sorting:string)=> {
         axios.get(`http://localhost:3000/courtHistory?_sort=${searchedItem}&${sorting}`,{
    
   
         }).then((resp)=>{
           setPendingInfo(resp.data)
           console.log(resp.data);
           
           if(sorting!=undefined){
             setFilteredItem(sorting.split('=')[1])
   
             
           }
           else {
             setFilteredItem(null)
           }
           
           if(currentPost?.length <=1) {
             console.log('khlas');
             
           }
           setSearchedItem(searchedItem)
         })
    
         
       }








  return (
    <>
<div className="container-fluid py-2">
<Header  title={'Sports Avenue Club'} img={pendingImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>


<div className="courtTitle d-flex gap-4 align-items-center my-3">
  <div className="titleWrapper">
  <h3>
  Courts Details
  </h3>
  <p>You can check all details</p>
  </div>
  <div className="search w-75">
  <SearchInput currentPost={currentPost} pendingInfo={pendingInfo} postsPerPage={postsPerPage} setCurrPage={setCurrentPage} setSearch={setSearch} sortingFunction={sortingFunction} filteredItem={filteredItem} />

</div>
</div>

<div className="d-flex justify-content-between ">
<div className="courtInfo border rounded w-75">
<ul className="nav align-items-center nav-pills mb-3  myTabs justify-content-between" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Schedule</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Court Details</button>
  </li>
  <li className="nav-item" role="presentation">
    <button onClick={()=>{   sortedItem('','')}} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">History</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Payments</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

  <div>
  <form onSubmit={handleSubmit(onSubmitHandler)}>

  
<div className="d-flex justify-content-around ">
<div className="courtDetails">
<div className="inputs d-flex flex-column  ">
<div className="coolinput">
  <label htmlFor="input" className="text">Name:</label>
  <input  type="text" defaultValue={courtDetails?.courtName}  className="form-control modalInputs" {...register('courtName')}/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Location:</label>
  <input  type="text" defaultValue={'Alseeb, Oman'}  className="form-control modalInputs"  {...register('location')}/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Id number:</label>
  <input  type="text" defaultValue={courtDetails?.idNumber}  className="form-control modalInputs" {...register('idNumber')}/>
</div>

<div className="coolinput">
  <label htmlFor="input" className="text">Registration number:</label>
  <input  type="text" defaultValue={'95432687125'}  className="form-control modalInputs" {...register('registrationNumber')}/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Start date:</label>
  <input  type="text" defaultValue={'9/7/2024'}  className="form-control modalInputs"/>
</div>



</div>


</div>

<div className="courtDetails">
<div className="inputs d-flex flex-column ">
<div className="coolinput">
  <label htmlFor="input" className="text">Total played games:</label>
  <input  type="text" defaultValue={'1'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Total upcoming reservations:</label>
  <input  type="text" defaultValue={'1'}  className="form-control modalInputs my-3"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Total cancelled reservations:</label>
  <input  type="text" defaultValue={'1'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Default price / hour:</label>
  <input  type="text" defaultValue={'17'}  className="form-control modalInputs"/>
</div>
</div>
</div>

</div>



<div className="ownerBtns d-flex gap-3 justify-content-center ">
<button type="button" className="btn border modalBtn"><IoDocumentOutline />
View Document
</button>
<button type="button" className="btn border modalBtn"><BsImage />

View court photos
</button>
</div>

<div className="text-center my-5">
<button className=" saveBtn">Save changes</button>
</div>
</form>
  </div>

  </div>
  
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

  <div className="pendingTable">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex align-items-center"><span>UserName</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('userName',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-userName',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>ID Number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('-idNumber',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('idNumber',sort)}  /></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Amount Paid</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('amountPaid',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-amountPaid',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Date</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('date',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-date',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Played Time</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('playedTimes',sort)} /> <IoIosArrowDown onClick={()=>sortedItem('-playedTimes',sort)}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>App Profit</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('appProfit',sort)}/> <IoIosArrowDown onClick={()=>sortedItem('-appProfit',sort)}/></span></div> </th>
  
  
  
      </tr>
    </thead>
   

   {
    currentPost?.length ==0 || pendingInfo?.length ==0 ? <NoData/> : <>
          <tbody>
  
  {
    currentPost?.filter((item)=>{

        if(searchedKeyword.toLocaleLowerCase()==='') {
            return item
            
        }
        else if(item.userName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item?.userName.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.amountPaid.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.amountPaid.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
            
        }
        else if(item.playedTimes.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.playedTimes.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        else if(item.appProfit.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
            return item.appProfit.toLocaleLowerCase().includes(searchedKeyword.toLocaleLowerCase())
        }
        console.log(item);
        
      
        
   

        

 }).map((info:pendingRequestInfo)=>      <tr key={info.id}>
    <td scope="row">
 
 <div className="d-flex gap-2 align-items-center">
 <div className="topUsersImage"><img src={userImg} /></div>
 <p className="my-0">{getHighlightedText(info.userName,searchedKeyword)}</p>
 </div>
     
    </td>
    <td>{getHighlightedText(info.idNumber,searchedKeyword)}</td>

    <td>{getHighlightedText(info.amountPaid,searchedKeyword)}</td>
    <td>{getHighlightedText(info.date,searchedKeyword)}</td>
    <td>{getHighlightedText(info.playedTimes,searchedKeyword)}</td>
    <td>{getHighlightedText(info.appProfit,searchedKeyword)}</td>

  </tr>)
  }
  </tbody>


  
    </>

   }

  </table>

          </div>

  </div>
  <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  </div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>
</div>

<div className="wrapper d-flex flex-column justify-content-between gap-4">
<div className="addressInfo rounded shadow-sm p-3 ">
  <div className="position-relative rounded overflow-hidden shadow gpsImg">
  <GpsImg />
  <button className="position-absolute btn-sm  btn viewFullScreen">View in full screen</button>
  <div className="position-absolute   gpsIcon d-flex flex-column align-items-center justify-content-center" >
  <RiMapPinLine size={'1.5rem'} />

  </div>
  </div>

  <div className="d-flex addressWrapper gap-2">
  <div className="pinkGps d-flex flex-column align-items-center justify-content-center">
  <RiMapPinLine size={'1.5rem'} />
  </div>
<div className="address">
  <p>Address</p>
  <p>795 Folsom Ave, Suite 600 San Francisco</p>
  <p className="fw-bolder">CADGE 94107</p>
</div>
  </div>

  
</div>


<div className="telInfo  shadow d-flex justify-content-center gap-2">
  <div className="pinkGps d-flex flex-column align-items-center justify-content-center">
  <BsTelephone size={'1.2rem'}/>

  </div>
<div className="phoneInfo">
  <p>Phone</p>
  <p >+12 5123 5512 66</p>
</div>
</div>

<div className="telInfo  shadow d-flex justify-content-center gap-2">
  <div className="pinkGps d-flex flex-column align-items-center justify-content-center">
  < MdOutlineMailOutline size={'1.2rem'}/>

  </div>
<div className="phoneInfo">
  <p>Email</p>
  <p >civeslauw@mail.com</p>
</div>
</div>
</div>
</div>


</div>
    </>
  )
}

export default CourtDetails
