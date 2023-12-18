import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/Constants';
import { cacheResults } from '../utils/searchSlice';

export default function Head() {
  const [searchQuery,setSearchQuery]=useState("");
  const [suggestions,setsuggestions]=useState([]);
  const [showSuggestions,setshowSuggestions]=useState(false);
  const searchCache=useSelector((store)=>store.search);
  // const dispatch=useDispatch();
  //console.log(searchQuery);
  useEffect(()=>{
    // console.log(searchQuery);
    const timer=setTimeout(()=>{
      if(searchCache[searchQuery]){
        setsuggestions(searchCache[searchQuery]);
      }
      else{
        getSearchSuggestion() 
      }
    }
   ,500);
    return()=>{
      clearTimeout(timer);
    };
  },[searchQuery]);
  const getSearchSuggestion=async()=>{
    console.log("API CALL"+searchQuery);
    const data=await fetch(YOUTUBE_SEARCH_API+searchQuery);
    const json= await data.json();
    setsuggestions(json[1]);
    dispatch(cacheResults({
      [searchQuery]:json[1]
    }));
    
  }
  const dispatch=useDispatch();
  const toggleMenuHandler=()=>{
    dispatch(toggleMenu());
  }
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
        <div className='flex col-span-1'>
            <img 
            onClick={()=>toggleMenuHandler()} className='h-8 cursor-pointer' alt="menu" src='data:image/jpeg;base64,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'/>
          <a href='/'>
          
          <img className='h-8 ml-2' alt='youtube_logo' src='https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo-2017-present.jpg'/>
          </a>
        </div>
        <div className='col-span-10 text-center'>
          <div>
            <input className='w-1/2 border border-green-300 p-2 rounded-l-full' type='text'
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              onFocus={()=>setshowSuggestions(true)}
              onBlur={()=>setshowSuggestions(false)}
            
            />
            <button className='border border-green-400 p-2 rounded-r-full'>Search</button>
            {showSuggestions &&(
            <div className='fixed bg-white p-2 px-1 w-96 text-center '>
              <ul>
                {suggestions.map((s)=>( <li key={s} className='py-2 shadow-sm hover:bg-gray-200'>{s}</li>))}
               
                

              </ul>
            </div>
            )}
            </div>
        </div>
        <div className='col-span-1'>
            <img  className='h-8' alt='user' src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png'/>
             
        </div>
      
    </div>
  )
}
