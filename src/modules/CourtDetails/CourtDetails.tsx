import Header from "../../shareComponents/Header/Header"
import pendingImg from '../../assets/images/bro.svg'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { IoDocumentOutline } from "react-icons/io5"
import { BsImage } from "react-icons/bs"

const CourtDetails = () => {

  const [courtDetails, setCourtDetails] = useState()
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
  return (
    <>
<div className="container-fluid">
<Header  title={'Sports Avenue Club'} img={pendingImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>


<div className="courtTitle">
  <h3>
  Courts Details
  </h3>
  <p>You can check all details</p>
</div>

<div className="courtInfo border rounded w-75">
<ul className="nav align-items-center nav-pills mb-3  myTabs justify-content-between" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Schedule</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Court Details</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">History</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Payments</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">


<div className="d-flex align-items-center">
<div className="d-flex  justify-content-between gap-5 w-50">
<div className="inputs d-flex flex-column  w-75">
<div className="coolinput">
  <label htmlFor="input" className="text">Name:</label>
  <input disabled type="text" value={courtDetails?.ownerName}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Location:</label>
  <input disabled type="text" value={'Alseeb, Oman'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Id number:</label>
  <input disabled type="text" value={courtDetails?.idNumber}  className="form-control modalInputs"/>
</div>

<div className="coolinput">
  <label htmlFor="input" className="text">Registration number:</label>
  <input disabled type="text" value={'95432687125'}  className="form-control modalInputs"/>
</div>
      <div className="coolinput">
  <label htmlFor="input" className="text">Start date:</label>
  <input disabled type="text" value={'9/7/2024'}  className="form-control modalInputs"/>
</div>



</div>


</div>

<div>
<div className="coolinput">
  <label htmlFor="input" className="text">Total played games:</label>
  <input disabled type="text" value={'1'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Total upcoming reservations:</label>
  <input disabled type="text" value={'1'}  className="form-control modalInputs my-3"/>
</div>
<div className="coolinput">
  <label htmlFor="input" className="text">Total cancelled reservations:</label>
  <input disabled type="text" value={'1'}  className="form-control modalInputs"/>
</div>
</div>

</div>



<div className="ownerBtns d-flex gap-3 justify-content-center ">
<button className="btn border modalBtn"><IoDocumentOutline />
View Document
</button>
<button className="btn border modalBtn"><BsImage />

View court photos
</button>
</div>

<div className="text-center my-5">
<button className=" saveBtn">Save changes</button>
</div>
  </div>

  
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>
</div>
</div>
    </>
  )
}

export default CourtDetails
