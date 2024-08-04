import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
const response=await fetch(url,config);
const data= await response.json();
if(!response.ok){
    throw new Error(data.message)
}
return data
}

export default function useHttp(url,config, initalData){
const [data,setData]=useState(initalData);
const [isLoading,setIsiLoading]=useState(false);
const [error,setError]=useState();
function clearData(){
    setData(initalData);
}
const sendRequest=useCallback(async (body)=>{
        try{
        setIsiLoading(true);
       const resData= await sendHttpRequest(url,{...config,body});
       setData(resData);
       }catch(error){
        setError(error.message);
       }
       setIsiLoading(false)
    },[url,config]) 
useEffect(()=>{
    if((config && (config.method==="GET" || !config.method)) || !config){
        sendRequest();
    }
},[sendRequest,config])
return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
}
}