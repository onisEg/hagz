import { Link } from 'react-router-dom';
import logo from '../../assets/images/navlogo.png'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";


export default function Navbar() {



  
    
 return <>
 <div className="
   container-fluid d-flex align-items-center justify-content-between  p-2 navbar rounded mt-3">
    <input type="text" placeholder='Search Here' className='searchInputNavbar'/>
    <CiSearch className='position-absolute mx-3 searchIcon' size={'1.2rem'}/>

    <div className="d-flex justify-content-between align-items-center gap-2">
  <div>
  <img src={logo } alt="profile avatar" className='navbarProfileImage'/>


<div className="btn-group">
<button className="btn  btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
{localStorage.getItem('userName') ? localStorage.getItem('userName') : 'user' }
</button>
<ul className="dropdown-menu drop text-center">
<Link to={'/'}>Logout</Link>
</ul>
</div>
  </div>
<IoIosNotifications />

    </div>
 </div>
 
 </>
}
