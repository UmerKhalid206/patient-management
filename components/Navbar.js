import React, { useEffect, useState } from 'react'
import {useRouter} from "next/router"; 
import Link from "next/link";
import Image from 'next/image'
import axios from 'axios';

const Navbar = ({}) => {

    const [auth, setAuth] = useState('')
    const router = useRouter();
    const [userData, setUserData] = useState('Profile')


    useEffect(() => {
        const user = localStorage.getItem('user');
        setAuth(user)

        axios.get('/api/patient/single?id='+user)
        .then(res => {
            setUserData(res.data)
        })
        
    },[])
// let currentUrl = window.location.href
// let arr = currentUrl.split(".app")
// console.log(arr[1])
    // const auth = localStorage.getItem('user');
    // console.log(auth)
    
    // name = name.replace('"', '')

    // console.log(name)
    

    const logout = () =>{
      localStorage.clear();
      router.push('/')          //using navigate here is a trick because we know we are already directing to signup on logout click then why we need this here again, actually the navigate() hook will re-render page without refreshing the page, and due to re-rendering then it will eliminate the signup button from navbar after the user is siggned up
  }


  return (
    <>
    <div className='bg-Cover'>
    <div className='container mx-auto'>
        <div className='px-8'>
    <div className="flex py-4 lg:py-6 items-center justify-between">
        <div className="flex items-center">
        <div className="flex items-center">
        <Image
      src="/download.png"
      width={20}
      height={20}
      alt="Picture of the author"
    />
             <span className="hidden sm:inline text-white ml-2 text-base lg:text-2xl font-bold leading-10">Patient</span>
         </div>

         <div className="hidden ml-10 gap-6  lg:flex">

            {auth?
            <div className='flex gap-8'>
         <div className="flex items-center">    
        <Link href={'/doctorList'}><div className="text-white">Home</div></Link>
        </div>
        <Link href={'/profile'}><div className="text-white">Profile</div></Link>
            </div>
    :
    null 
    }
        

         </div>
        </div> 

        <div className="ml-4 flex gap-4 items-center">
        {
        auth?
        <div className='flex md:gap-8 gap-4'>
            <div className='text-sm md:text-base flex items-center text-white'>Hey! &nbsp;<span className='text-green-500 font-bold'>{`${userData.name}`}</span></div>
     <div className="w-[115px] h-10 px-8 py-2 bg-blue-600 rounded-lg justify-center items-center inline-flex">
        <div onClick={logout} className="text-white text-sm font-semibold font-Poppins leading-normal cursor-pointer">Logout</div> 
    </div>
    </div>
        :
    <div className="h-10 px-8 py-2 bg-blue-600 rounded-lg justify-center items-center inline-flex">

    </div>
        

        
    }
    </div>   
    
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Navbar
