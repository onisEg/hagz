import Header from "../../shareComponents/Header/Header";
import dashboardImg from '../../assets/images/amico.png'
import { useEffect, useState } from "react";
import axios from "axios";
import CourtSlider from "../CourtSlider/CourtSlider";
export default function Dashboard() {

     interface info  {
        title : string,
        id : number,
        icon : string,
        number : number
    }

    const [userInfo, setUserInfo] = useState([])


    const getUserInfo = ()=> {
        axios.get(`http://localhost:3000/userInfo`).then((resp)=>{
            console.log(resp.data);
            setUserInfo(resp.data)
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }


    useEffect(()=>{
        getUserInfo()
    },[])
return <>

<div className="container">
<Header title={'Dashboard'} img={dashboardImg} svg={<svg width="202" height="73" viewBox="0 0 202 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M188.598 42C188.598 98.2732 147.995 141.5 100.701 141.5C53.408 141.5 12.8047 98.2732 12.8047 42C12.8047 -14.2732 53.408 -57.5 100.701 -57.5C147.995 -57.5 188.598 -14.2732 188.598 42Z" stroke="white" strokeWidth="25"/>
<path d="M120.848 36.5C120.848 50.0326 111.005 60 100.043 60C89.0809 60 79.2383 50.0326 79.2383 36.5C79.2383 22.9675 89.0809 13 100.043 13C111.005 13 120.848 22.9675 120.848 36.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

    <div className="userInfo container ">
        <div className="row  userFlex justify-content-between">
        {
            userInfo?.map((user:info)=>        <div key={user?.id} className=" col-md-3  col-lg-2 info bg-white shadow">
            <h4>{user?.title}</h4>
            <div className="d-flex align-items-center">
            <p className="my-0 mx-3">{user?.number}</p>

            {user.icon == " fa-solid fa-arrow-trend-up" ?             <i  className={`${user.icon} text-success`}></i>
 :    <i  className={`${user.icon} text-danger`}></i>
            }
            </div>
        </div>)
        }
        </div>
    </div>
        <div className="d-flex justify-content-between align-items-center sliderWrapper">
        <CourtSlider/>
    <div className="totalDeactive">
        <h3>Total Deactivated</h3>
        <span>200</span>
    </div>
        </div>
</div>


</>
}
