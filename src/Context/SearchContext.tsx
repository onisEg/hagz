import { createContext, useState } from "react";
import { pendingRequestInfo } from "../interfaces/interfaces";
import { searchCont } from '../modules/PendingRequest/PendingRequest';


export const searchContext = createContext <searchCont>()

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

export default function SearcContextProvider({children}) {
        const [pendingInfo, setPendingInfo] = useState <pendingRequestInfo[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [searchedKeyword, setSearch] = useState('')
    const [filteredItem, setFilteredItem] = useState <string|null|undefined>(null)
    const [searchedItem, setSearchedItem] = useState('')
    const [sort, setSort] = useState('')
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = pendingInfo?.slice(indexOfFirstPost,indexOfLastPost)


 const sortingFunction = (sorting:string) =>{
  sortedItem(searchedItem,sorting)
  setSort(sorting)
  console.log("searched",searchedItem);
  
  console.log(sorting);
  

 }


    return <searchContext.Provider value={{setSearchedItem,pendingInfo,postsPerPage,currentPost,sortingFunction,setSearch,filteredItem,setPendingInfo,currentPage,searchedKeyword,sort,setFilteredItem,setCurrentPage,getHighlightedText}}>

        {children}
    </searchContext.Provider>
}