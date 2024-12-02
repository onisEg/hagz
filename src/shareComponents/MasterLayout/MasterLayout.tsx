import { Outlet } from "react-router-dom";
import SideBar from "../sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout() {
return <>
    <div className='d-flex '>
        <div className='sideContain' >
          <SideBar />
        </div>
        <div className='w-100 mx-3 masterLayout'>
        <Navbar/>
            <Outlet/>
        </div>

    </div>
</>
}
