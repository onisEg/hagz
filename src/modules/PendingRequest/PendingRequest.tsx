import Header from "../../shareComponents/Header/Header"
import pendingImg from '../../assets/images/rafiki.svg'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { pendingRequestInfo } from "../../interfaces/interfaces";
import NoData from "../../shareComponents/NoData/NoData";
import SearchInput from "../../shareComponents/SearchInput/SearchInput";



const PendingRequest = () => {

    const [pendingInfo, setPendingInfo] = useState <pendingRequestInfo[]>()
    const [searchedKeyword, setSearch] = useState('')

 



    const getHighlightedText = (text:string, highlight:string) => {
        if (!highlight.trim()) return text;
    
        const regex = new RegExp(`(${highlight})`, 'gi');
        
        const parts = text.split(regex);
    
        return parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
              {part}
            </span>
          ) : (
            part
          )
        );
      };
    

    const getPendingInfo = ()=>{
        axios.get(`http://localhost:3000/pendingTableInfo` , {
          
        
     
        }).then((response)=>{
        setPendingInfo(response?.data)}
      
        ).catch((error)=>console.log(error)
        )
    }

    const sortedItem = (item:string)=> {
      axios.get(`http://localhost:3000/pendingTableInfo?${item}`,{
   
      }).then((resp)=>{
        setPendingInfo(resp.data)
        console.log(resp.data.data);

      })
      
        console.log(item);
        
      
    }

    useEffect(()=>{
        getPendingInfo()
        
        
    },[]
)


return <>
    <div className="container-fluid">
        
<Header  title={'Pending Requests'} img={pendingImg} svg={<svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54 29.5C54 42.384 43.3503 53 30 53C16.6497 53 6 42.384 6 29.5C6 16.616 16.6497 6 30 6C43.3503 6 54 16.616 54 29.5Z" stroke="#EEF2FF" strokeWidth="12"/>
</svg>
}/>

<SearchInput setSearch={setSearch}/>
<div className="pendingTable">
<div className=" table-responsive  ">
        <table className="table text-center  ">
  <thead>
    <tr className="tableHeadTr pendingT">

      <th className="firstTh " scope="col"><div className="d-flex align-items-center"><span>Court Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('_sort=courtName')}/> <IoIosArrowDown onClick={()=>sortedItem('_sort=-courtName')}/></span></div> </th>
      <th  scope="col">Image </th>
      <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Price</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('_sort=-Price')} /> <IoIosArrowDown onClick={()=>sortedItem('_sort=Price')}  /></span></div> </th>
      <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Description</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('_sort=Description')} /> <IoIosArrowDown onClick={()=>sortedItem('_sort=-Description')}/></span></div> </th>
      <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Owner Name</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('_sort=ownerName')}/> <IoIosArrowDown onClick={()=>sortedItem('_sort=-ownerName')}/></span></div> </th>
      <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Category</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp onClick={()=>sortedItem('_sort=category')} /> <IoIosArrowDown onClick={()=>sortedItem('_sort=-category')}/></span></div> </th>
      <th scope="col"><div className="d-flex align-items-center justify-content-center"><span>Status</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('_sort=status')}/> <IoIosArrowDown onClick={()=>sortedItem('_sort=-status')}/></span></div> </th>
      <th className="lastTh" scope="col"><div className="d-flex align-items-center"><span>ID number</span> <span className="d-flex flex-column pendingTableArrow mx-2"> <IoIosArrowUp  onClick={()=>sortedItem('_sort=-idNumber')}/> <IoIosArrowDown  onClick={()=>sortedItem('_sort=idNumber')}/></span></div> </th>



    </tr>
  </thead>
 {
    pendingInfo?.length == 0 ? <NoData/> :  <tbody>

    {
      pendingInfo?.filter((item)=>{
  
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
          
      
  
          
          
  
   }).map((info:pendingRequestInfo)=>      <tr key={info.idNumber}>
      <td scope="row">
          <p>{getHighlightedText(info.courtName,searchedKeyword)}</p>
       
      </td>
  
      
      <td><div className="pendimage"><img src={info.image} alt="football yard" /></div></td>
      <td>{getHighlightedText(info.Price.toString(),searchedKeyword)}</td>
      <td>{getHighlightedText(info.Description,searchedKeyword)}</td>
      <td>{getHighlightedText(info.ownerName,searchedKeyword)}</td>
      <td>{getHighlightedText(info.category,searchedKeyword)}</td>
      <td ><span className={info.status == 'Approved' ? `pendingStatus bg-success` : info.status == 'Pending' ? `pendingStatus bg-black` : `pendingStatus bg-danger` }>{info.status}</span></td>
      <td>{info.idNumber} <FaEllipsisH className="mx-2"/>
      </td>
    </tr>)
    }
    </tbody>
 }

</table>
        </div>

</div>
    </div>

</>
}

export default PendingRequest
