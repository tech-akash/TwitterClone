import React,{useState,useEffect,createContext} from "react"
import axios from "axios";
export const ApiContext=createContext();

export const ApiContextProvider=({children})=>{
    let [data,setData]=useState(null)
    async function getdata() {
        try {
    
          let response = await axios.get(`http://127.0.0.1:8000/`, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          console.log("GetData Called!")
          setData(response.data)
        } catch (e) {
          // console.log(e)
          
            alert(e.message)
          
        }
      }
    useEffect(()=>{
        getdata()
    },[])
    let contextData = {
        data:data,
        getdata:getdata
    }
    return (
        <ApiContext.Provider value={contextData}>
        
            {children}
        </ApiContext.Provider>
    )
}
