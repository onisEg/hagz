import Header from "../../shareComponents/Header/Header"
import settings from '../../assets/images/settings.png'
import toast from "react-hot-toast"
import { IoPencil } from "react-icons/io5";
import { useState } from "react";
import person from '../../assets/images/person.jpg'
import { BiImage } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";

const Settings = () => {

	const [imageFile, setImageFile] = useState<MediaSource|Blob|null>();




  const uploadImage = (selectorFiles:FileList|null) => {
    if (selectorFiles) {
		console.log(selectorFiles);
      setImageFile(selectorFiles[0]);
      // setValue("profileImage", selectorFiles[0]);
    }
  };
  const discardProfileImage = ():void=> {
    // setValue('profileImage',null)
    setImageFile(null)
	
  }


return <>
<Header  title={'Settings'} img={settings} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<div className="my-5">
<ul className="nav gap-5  myTabs nav-tabs align-items-center justify-content-center" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Profile</button>
  </li>
  <li className="nav-item " role="presentation">
    <button className="nav-link " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Password</button>
  </li>

</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  <div className="w-50 mx-auto my-5">
<form>

  <div className="profileImg">
  {imageFile ? <>{imageFile && (
  <div className="formImage customFileUpload flex-row" >
    <img src={URL.createObjectURL(imageFile) }  

    />
    <button  className="btn"
  
    onClick={discardProfileImage}>


    <FaXmark  className="text-danger" size={'1.7rem'}/>

    <span className='sr-only'>{imageFile? 'discard upload profile image' : 'upload profile image'}</span>

    </button>
  </div>
)}</> :  <div className="profileImageField mx-2  ">
<label htmlFor="file-upload" className="customFileUpload">
  <div className="d-flex gap-4 align-items-center">
  <div  className="formImage">
<img  src={person} alt="form profile image" className="" />

</div>

<div className="anotherLabel  d-flex align-items-center gap-3 rounded shadow py-2 px-4">
<BiImage size={'1.7rem'} />

  <p className="my-0">Upload Photo</p>
</div>
  </div>



               </label>
     <input  
   
 id="file-upload"  className="fileUpload" type="file" onChange={(e) => uploadImage(e.target.files)}
   
   
   />


</div>}

  </div>
<div className="coolinput position-relative">
  <label  className="text">Name:</label>
  <input id="name"  type="text" defaultValue={'Ahmed Mohamed'}  className="form-control modalInputs"/>
  <label htmlFor="name">  <IoPencil  className="position-absolute editPen  top-50" />
  </label>
</div>
<div className="coolinput my-3 position-relative">
  <label  className="text">Phone:</label>
  <input id="phone" type="text" defaultValue={'9652 0215'}  className="form-control modalInputs"/>
  <label htmlFor="phone">  <IoPencil  className="position-absolute editPen  top-50" />
  </label>
</div>
<div className="coolinput position-relative">
  <label  className="text">Email:</label>
  <input id="email" type="text" defaultValue={'Ahmed Mohamed@whatever.com '}  className="form-control modalInputs"/>
  <label htmlFor="email">  <IoPencil  className="position-absolute editPen  top-50" />
  </label>
</div>
<div className="coolinput">
  <label  className="text my-2">ID number:</label>
  <input  type="text" defaultValue={'#3215658'}  className="form-control modalInputs"/>
</div>
<div className="coolinput my-2 position-relative">
  <label  className="text ">Location:</label>
  <input id="address" type="text" defaultValue={'Alseeb, Oman'}  className="form-control modalInputs"/>
  <label htmlFor="address">  <IoPencil  className="position-absolute editPen  top-50" />
  </label>
</div>
<button type="button" onClick={()=>toast.success('profile updated')} className="w-100 saveEdit btn text-white my-4 py-2">Save Changes</button>
</form>
</div>




  </div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">


<div className="w-50 mx-auto my-5">
<form>
<div className="coolinput">
  <label  className="text">Old Password:</label>
  <input  type="text" defaultValue={'Ahmed Mohamed'}  className="form-control modalInputs"/>
</div>
<div className="coolinput my-3">
  <label  className="text">New Password:</label>
  <input  type="text" defaultValue={'Ahmed Mohamed'}  className="form-control modalInputs"/>
</div>
<div className="coolinput">
  <label  className="text">Confirm new Password:</label>
  <input  type="text" defaultValue={'Ahmed Mohamed'}  className="form-control modalInputs"/>
</div>
<button type="button" onClick={()=>toast.success('password changed')} className="w-100 saveEdit btn text-white my-4 py-2">Save Changes</button>
</form>
</div>



  </div>
</div>
</div>

</>
}

export default Settings
