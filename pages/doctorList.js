import React, { useState, useEffect } from 'react'
import {useRouter} from "next/router"; 
import Navbar from '@/components/Navbar'
import Card from '@/components/Card';
import axios from 'axios';
const DoctorList = () => {
  const [auth, setAuth] = useState('')
    const router = useRouter();

    const [doctors,setDoctors] = useState([]);
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        setAuth(user)
        axios.get('/api/doctor/register')
        .then(response => {
          // console.log(response.data)
          setDoctors(response.data);
        });
    },[])

    function reCall(id){
     if(id){
      axios.get('/api/doctor/register')
        .then(response => {
          // console.log("new data",response.data)
          setDoctors(response.data);
        });
     }
     else{
      return;
     }
    }

    if(auth){
      // console.log(doctors)
  return (
    <div className=' h-full'>
        <Navbar />
      <div className='container mx-auto'>
        <div className='flex flex-col items-center my-8 md:px-4'>
        <h1 className='text-xl font-semibold md:text-2xl sm:font-bold lg:text-3xl'>Doctors list</h1>
        <div className='grid md:grid-cols-2 py-8 md:mx-8 gap-12 w-[90%] sm:w-[70%] md:w-[80%]'>
        {doctors.map((doc) => 
        <div key={doc._id}>
          <Card recall={reCall} data={doc}/>
        </div>)}
          </div>
        </div>
    </div>
    </div>
  )
}else{
  return(
    <div className='grid place-content-center h-screen'>
      <div className='text-red-400'>Please Login to have data</div>
    </div>
  )
}


}

export default DoctorList