import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  NavLink } from 'react-router-dom';
import logo from '../../assets/images/ahjiz.png'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import { PiCourtBasketball } from "react-icons/pi";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiFunctionAddLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


export default function SideBar() {




    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapsing = ()=>{
      setIsCollapsed(!isCollapsed)
     
    }
  

//   const logOut = ()=>{
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('token')
//     setLoginData(null)
//     navigate('/login')
//   }
return <>

<div className='side-bar-container fullScreenSlider'>
<Sidebar    collapsed={isCollapsed} >
  <Menu>
      <div className="logo my-5 ">
      

      <MenuItem className='myLogo d-flex justify-content-center'   onClick={toggleCollapsing}  icon={<img src={logo} alt="football logo"   />} >{isCollapsed ? <IoIosArrowForward className='position-absolute end-0 top-0 me-2 sideArrow' color='white' />  : <IoIosArrowBack   className='position-absolute end-0 top-0 me-2 sideArrow' color='white'/>
      }</MenuItem>
      <span className='sr-only'>{isCollapsed ? 'click to open side bar' : ' click to close side bar'} </span>
      </div> 
      <div className="my-5 fixed-icons">


     
    <MenuItem  icon = {<LuLayoutDashboard  fontSize={'1.3rem'}  />} component={<NavLink to='/dashboard'/>}> Dashboard <span className='sr-only'>navigate to dashboard</span> </MenuItem>


    <MenuItem icon={<MdPendingActions fontSize={'1.3rem'}/>} component={<NavLink to='pending-request'/>}> Pending Requests <span className='sr-only'>navigate to Pending Requests </span></MenuItem>
  <MenuItem icon={<PiCourtBasketball  fontSize={'1.3rem'} />
} component={<NavLink to='/court-list'/>}> Manage Courts  <span className='sr-only'>navigate to Manage Courts</span></MenuItem>

  <MenuItem icon={<PiUsersThree   fontSize={'1.3rem'}/>} component={<NavLink to='/users-list'/>}> Users  <span className='sr-only'>navigate to users</span></MenuItem>
  <MenuItem icon={<IoSettingsOutline   fontSize={'1.3rem'}/>} component={<NavLink to='/settings'/>}> Settings <span className='sr-only'>navigate to settings</span> </MenuItem>
  

 
  



<MenuItem icon={<RiFunctionAddLine  fontSize={'1.3rem'} />} component={<NavLink to='/add-admins'/>}> Add admins <span className='sr-only'>navigate to add admins</span> </MenuItem>


    </div>
  </Menu>
</Sidebar>











</div>


</>
}
