import { CiSearch } from 'react-icons/ci'
interface search  {
  setSearch : React.Dispatch<React.SetStateAction<string>>
}
const SearchInput :React.FC<search> =({setSearch}) => {
  
  return <>
 
  <div className="searchingTable d-flex ">
    <div className="position-relative w-25 d-flex align-items-center">
    <input onChange={(e)=>setSearch(e.target.value)
    } type="text" placeholder="search here ..."  className='searchTable form-control'/>
    <CiSearch className='position-absolute  mx-3 searchTableIcon' size={'1.2rem'}/>
    </div>
 
 </div>
   </>
}

export default SearchInput 
