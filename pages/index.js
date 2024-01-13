import React, { useState, useEffect } from 'react'
import Layout from "@/components/Layout";
import PatientLayout from "@/components/PatientLayout";
import {useSession, signIn, signOut} from "next-auth/react";
import Link from "next/link";
import axios from 'axios';
import {useRouter} from "next/router"; 
import { toast } from 'react-hot-toast';
import Image from 'next/image'


export default function Home() {
  const {data: session} = useSession();
  // console.log(session?.isAdmin)
  let admin = session?.isAdmin
  // console.log(admin)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const router = useRouter();

  // console.log(auth)

  useEffect(() => {
    const user = localStorage.getItem('user');
    setAuth(user)
    // console.log(user)
    if(user){                               //if user is siggned up then
        router.push('/doctorList')              //it is working as if user is signed up then he can not go to signup again, but he/she will be navigated to home
    }
    else{
      router.push('/')
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const handleEmailFocus = () => {
  setEmailError(false);
};
const handlePasswordFocus = () => {
  setPasswordError(false);
};

  const loginUser = async() => {
    
    if(email === '' && password === ''){
      setEmailError(true)
      setPasswordError(true)
      return;
    }else if(email === ''){
      setEmailError(true)
      return;
    }else if(password === ''){
      setPasswordError(true)
      return;
    }

    const data= {
      email, password 
  }
try {
  
  await axios.post('/api/patient/single', data)
        .then(res => {
          console.log( res)
          if(res.status === 200){
            localStorage.setItem("user", res.data.user)
            router.push('/doctorList')
            toast.success('Welcome Home', {position: 'top-center'});
          }

        })
} catch (error) {

  router.push('/')
  toast.error(error.response.data, {position: 'top-center'});
  
}

        
      
  }



  if(!admin){
    return (
  <div className='bg-blue-900 h-screen'>
  
  <div className='container mx-auto'>
    <div className=" flex flex-col justify-center items-center pt-16 md:mb-16">
            
            <div className='shadow-lg py-8 bg-white flex flex-col justify-center items-center md:py-12 px-4 w-[90%] sm:w-4/5 lg:w-[40%] md:border rounded-md md:rounded-lg'>
            <h1 className='text-2xl md:text-4xl font-bold '>Patient Login Form</h1>
            <div className='mx-4 md:mx-8'>
            <input onFocus={handleEmailFocus} className='md:mt-8 rounded-lg border border-blue-400 outline-none md:pl-4 md:py-2' type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            {emailError && <div className='absolute -mt-1 text-xs text-red-500'>Email field is required</div>}
            <input onFocus={handlePasswordFocus} className='inputBox mt-4 md:mt-8 rounded-lg border border-blue-400 outline-none pl-4 py-2' type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            {passwordError && <div className='absolute -mt-1 text-xs text-red-500'>Password field is required</div>}
            </div>
            <div className="mt-4 flex justify-center gap-14 w-full">
            <div><button onClick={() => signIn('google')} className="text-base md:p-2 md:px-4 text-blue-900 hover:text-red-500 ">Admin Login</button></div>
            <p className=' flex items-center'type='button'> <span className='hidden md:flex'>Not have account?</span><span className='ml-2'><Link className="hover:border-b border-blue-400 hover:text-blue-400 " href={'/signup'}>Sign up</Link></span></p>
            </div>
            <button className='mt-4 px-2 py-1 appButton rounded-md text-white  bg-blue-400 border border-blue-400 hover:text-blue-400 hover:bg-white'type='button' onClick={loginUser}>Sign In</button>
            </div>
  </div>
  </div>
  </div>
  )
  }

// if(auth){
//   return(
//     <PatientLayout />
//   )
// }

  if(admin){
  return (
    <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
      <Image
      src={session?.user?.image}
      width={24}
      height={24}
      alt="User pic"
    />
        {/* <img src={session?.user?.image} alt="" className="w-6 h-6"/> */}
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  </Layout>
  )
}
}