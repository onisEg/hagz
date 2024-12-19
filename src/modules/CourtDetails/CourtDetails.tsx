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
import { GiProfit } from "react-icons/gi";



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


   const sortedItem = (searchedItem:string,sorting:string,searchedArray:string)=> {
         axios.get(`http://localhost:3000/${searchedArray}?_sort=${searchedItem}&${sorting}`,{
    
   
         }).then((resp)=>{
           setPendingInfo(resp.data)
           console.log(resp.data);
           
           if(sorting!=undefined){
             setFilteredItem(sorting.split('=')[1])
   
             
           }
           else {
             setFilteredItem(null)
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
    <button onClick={()=>{   sortedItem('','','courtHistory')}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Court Details</button>
  </li>
  <li className="nav-item" role="presentation">
    <button onClick={()=>{   sortedItem('','','courtHistory')}} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">History</button>
  </li>
  <li className="nav-item" role="presentation">
    <button onClick={()=>{   sortedItem('','','invoices')}} className="nav-link" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Payments</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">test</div>
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
  
        <th className="firstTh " scope="col"><div className="d-flex align-items-center justify-content-center"><span>UserName</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('userName',sort,'courtHistory')}/> <IoIosArrowDown onClick={()=>sortedItem('-userName',sort,'courtHistory')}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>ID Number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('-idNumber',sort,'courtHistory')} /> <IoIosArrowDown onClick={()=>sortedItem('idNumber',sort,'courtHistory')}  /></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Amount Paid</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('amountPaid',sort,'courtHistory')} /> <IoIosArrowDown onClick={()=>sortedItem('-amountPaid',sort,'courtHistory')}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Date</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('date',sort,'courtHistory')}/> <IoIosArrowDown onClick={()=>sortedItem('-date',sort,'courtHistory')}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Played Time</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('playedTimes',sort,'courtHistory')} /> <IoIosArrowDown onClick={()=>sortedItem('-playedTimes',sort,'courtHistory')}/></span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>App Profit</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('appProfit',sort,'courtHistory')}/> <IoIosArrowDown onClick={()=>sortedItem('-appProfit',sort,'courtHistory')}/></span></div> </th>
  
  
  
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
          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  </div>

  </div>
  <div className="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab">

<div className="d-flex  gap-3">
<div className="pendingTable pendingPay">
  <div className=" table-responsive  ">
          <table className="table text-center  ">
    <thead>
      <tr className="tableHeadTr pendingT">
  
        <th className="firstTh " scope="col"><div className="d-flex align-items-center justify-content-center"><span>Invoices</span> <span className="d-flex flex-column pendingTableArrow mx-2"> </span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Date</span> <span className="d-flex flex-column pendingTableArrow mx-2">  </span></div> </th>
        <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Amount</span> <span className="d-flex flex-column pendingTableArrow mx-2"></span></div> </th>
        <th className="lastTh " scope="col"><div className="d-flex align-items-center justify-content-center"><span>Status</span> <span className="d-flex flex-column pendingTableArrow mx-2"> </span></div> </th>

  
  
  
      </tr>
    </thead>
   

   {
    currentPost?.length ==0 || pendingInfo?.length ==0 ? <NoData/> : <>
          <tbody>
  
  {
   currentPost?.filter((item) => {
    
    if (searchedKeyword.toLocaleLowerCase() === "") {
        return item;
    }

    if (item?.invoices?.toLowerCase().includes(searchedKeyword.toLocaleLowerCase())) {
        return item;
    }
    if (item?.date?.toLocaleLowerCase()?.includes(searchedKeyword.toLocaleLowerCase())) {
        return item;
    }
    if (item?.amountPaid?.toLocaleLowerCase()?.includes(searchedKeyword.toLocaleLowerCase())) {
        return item;
    }
    if (item?.status?.toLocaleLowerCase()?.includes(searchedKeyword.toLocaleLowerCase())) {
        return item;
    }

    return false; // Skip invalid items
  }).map((info:pendingRequestInfo)=>      <tr key={info.id}>
   

    <td>{getHighlightedText(info?.invoices,searchedKeyword)}</td>
    <td>{getHighlightedText(info?.date,searchedKeyword)}</td>
    <td>{getHighlightedText(info?.amountPaid,searchedKeyword)}</td>
    <td ><span className={info.status == 'Paid' ? `pendingStatus text-success` : info.status == 'Refunded' ? `Refunded ` : `pendingStatus text-danger` }>{info.status}</span></td>

  </tr>)
  }
  </tbody>


  
    </>

   }

  </table>

          </div>
          <Pagination setCurrentPage={setCurrentPage}  totalPosts={pendingInfo} postsPerPage={postsPerPage} currentPosts={currentPost} currentPage={currentPage}/>

  </div>  
  
  <div className="payments text-center d-flex flex-column gap-3 mt-4">
    <div className="firstPay border">
   <div className="pay">
   <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.8346 21.668C22.4457 21.668 21.2652 21.1819 20.293 20.2096C19.3207 19.2374 18.8346 18.0569 18.8346 16.668C18.8346 15.2791 19.3207 14.0985 20.293 13.1263C21.2652 12.1541 22.4457 11.668 23.8346 11.668C25.2235 11.668 26.4041 12.1541 27.3763 13.1263C28.3485 14.0985 28.8346 15.2791 28.8346 16.668C28.8346 18.0569 28.3485 19.2374 27.3763 20.2096C26.4041 21.1819 25.2235 21.668 23.8346 21.668ZM12.168 26.668C11.2513 26.668 10.4669 26.3419 9.81464 25.6896C9.16241 25.0374 8.83575 24.2524 8.83464 23.3346V10.0013C8.83464 9.08464 9.1613 8.30019 9.81464 7.64797C10.468 6.99575 11.2524 6.66908 12.168 6.66797H35.5013C36.418 6.66797 37.203 6.99464 37.8563 7.64797C38.5096 8.3013 38.8357 9.08575 38.8346 10.0013V23.3346C38.8346 24.2513 38.5085 25.0363 37.8563 25.6896C37.2041 26.343 36.4191 26.6691 35.5013 26.668H12.168ZM15.5013 23.3346H32.168C32.168 22.418 32.4946 21.6335 33.148 20.9813C33.8013 20.3291 34.5857 20.0024 35.5013 20.0013V13.3346C34.5846 13.3346 33.8002 13.0085 33.148 12.3563C32.4957 11.7041 32.1691 10.9191 32.168 10.0013H15.5013C15.5013 10.918 15.1752 11.703 14.523 12.3563C13.8707 13.0096 13.0857 13.3357 12.168 13.3346V20.0013C13.0846 20.0013 13.8696 20.328 14.523 20.9813C15.1763 21.6346 15.5024 22.4191 15.5013 23.3346ZM33.8346 33.3346H5.5013C4.58464 33.3346 3.80019 33.0085 3.14797 32.3563C2.49575 31.7041 2.16908 30.9191 2.16797 30.0013V11.668H5.5013V30.0013H33.8346V33.3346Z" fill="#4F46E5"/>
</svg>
<h3>Total Earnings</h3>
<h4>OMR 10500</h4>
   </div>
    </div>
    <div className="firstPay border">
   <div className="pay">
   <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.682 4.85L20.2154 8.33333H23.832C27.3682 8.33333 30.7596 9.73809 33.2601 12.2386C35.7606 14.7391 37.1654 18.1304 37.1654 21.6667H33.832C33.832 19.0145 32.7785 16.471 30.9031 14.5956C29.0277 12.7202 26.4842 11.6667 23.832 11.6667H20.2154L23.6987 15.15L21.332 17.5L13.832 10L16.182 7.65L21.332 2.5L23.682 4.85ZM3.83203 20V36.6667H30.4987V20H3.83203ZM7.16536 30.9333V25.75C8.16723 25.1681 9.00015 24.3352 9.58203 23.3333H24.7487C25.3306 24.3352 26.1635 25.1681 27.1654 25.75V30.9333C26.1778 31.5152 25.357 32.3418 24.782 33.3333H9.58203C8.99787 32.3376 8.16513 31.5106 7.16536 30.9333ZM17.1654 31.6667C18.5454 31.6667 19.6654 30.175 19.6654 28.3333C19.6654 26.4917 18.5454 25 17.1654 25C15.7854 25 14.6654 26.4917 14.6654 28.3333C14.6654 30.175 15.7854 31.6667 17.1654 31.6667Z" fill="#4F46E5"/>
</svg>
<h3>Total Rejected or Refunded</h3>
<h4>OMR 10500</h4>
   </div>
    </div>
    <div className="firstPay border">
   <div className="pay">
   <GiProfit className="payIcon"/>
<h3>Total Company Profit</h3>
<h4>OMR 10500</h4>
   </div>
    </div>

  </div>
</div>
  
  </div>
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
