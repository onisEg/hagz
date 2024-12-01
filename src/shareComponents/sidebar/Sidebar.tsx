import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdPendingActions } from "react-icons/md";
import { PiCourtBasketball } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiFunctionAddLine } from "react-icons/ri";


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
      <MenuItem className='myLogo d-flex justify-content-center'  onClick={toggleCollapsing}  icon={<img src={logo} alt="football logo"   />} > </MenuItem>
      <span className='sr-only'>{isCollapsed ? 'click to open side bar' : ' click to close side bar'} </span>
      </div> 
      <div className="my-5 fixed-icons">


     
    <MenuItem  icon = {<LuLayoutDashboard  fontSize={'1.3rem'}  />} component={<NavLink to='/dashboard'/>}> Dashboard <span className='sr-only'>navigate to dashboard</span> </MenuItem>


    <MenuItem icon={<MdPendingActions fontSize={'1.3rem'}/>} component={<NavLink to='/dashboard'/>}> Pending Requests <span className='sr-only'>navigate to Pending Requests </span></MenuItem>
  <MenuItem icon={<PiCourtBasketball  fontSize={'1.3rem'} />
} component={<NavLink to='/dashboard'/>}> Manage Courts  <span className='sr-only'>navigate to Manage Courts</span></MenuItem>
  <MenuItem icon = {<HiOutlineUsers />
} component={<NavLink to='/dashboard'/>}> Court Owners <span className='sr-only'>navigate to categories list</span></MenuItem> 
  <MenuItem icon={<PiUsersThree   fontSize={'1.3rem'}/>} component={<NavLink to='/dashboard'/>}> Users  <span className='sr-only'>navigate to users</span></MenuItem>
  <MenuItem icon={<IoSettingsOutline   fontSize={'1.3rem'}/>} component={<NavLink to='/dashboard'/>}> Settings <span className='sr-only'>navigate to settings</span> </MenuItem>
  

 
  



<MenuItem icon={<RiFunctionAddLine  fontSize={'1.3rem'} />} component={<NavLink to='/dashboard'/>}> Add admins <span className='sr-only'>navigate to add admins</span> </MenuItem>


    </div>
  </Menu>
</Sidebar>











</div>


</>
}
