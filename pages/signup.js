import React, { useState } from 'react'
import axios from 'axios';
import {useRouter} from "next/router";  
import { toast } from 'react-hot-toast';
import Link from 'next/link';
const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const router = useRouter();
    const savePatient = async() => {
        const data= {
            name,email, password, number
        }
        console.log(data)
        axios.post('/api/patient', data)
        .then(res => {
            if(res.status === 201){
                toast.success('Sign up Successful', {position: 'top-right'});
                    router.push('/')
            }
            else{
                toast.error('Could not Register!');
            }
        })
        
    }
    return (
        <div className='gradient lg:h-[100vh] xl:h-[110vh]'>
        <div className='container mx-auto'>
          <div className=" flex flex-col justify-center items-center pt-16 pb-8">
                  
                  <div className='shadow-lg py-8 bg-white flex flex-col justify-center items-center md:py-12 px-4 w-[90%] sm:w-4/5 lg:w-[60%] xl:w-[40%] md:border rounded-md md:rounded-lg'>
                  <h1 className='text-xl md:text-4xl font-bold '>Patient Registration Form</h1>
                  <div className='mx-4 md:mx-8'>
                  <input  className='md:mt-8 rounded-lg border border-blue-400 outline-none md:pl-4 md:py-2' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}/>
                    <input className='inputBox mt-6  rounded-lg border border-blue-400 outline-none pl-4 py-2' type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input className='inputBox mt-6  rounded-lg border border-blue-400 outline-none pl-4 py-2' type='number' placeholder='Enter your Number' onChange={(e)=>setNumber(e.target.value)}/>
                    <input className='inputBox mt-6  rounded-lg border border-blue-400 outline-none pl-4 py-2' type="password" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className="flex gap-4 mt-4">
                  <div><button className='px-2 py-1 appButton rounded-md text-white  bg-blue-400 border border-blue-400 hover:text-blue-400 hover:bg-white'type='button' onClick={savePatient}>Sign Up</button></div>
                  <div className='flex items-center'><span className='hidden md:flex'>Have account?</span><Link href={'/'} className='hover:text-blue-400 ml-2 hover:border-b border-blue-400'  type='button'>Sign In</Link></div>
                  </div>
                  </div>
        </div>
        </div>
        </div>
        )
//     return (

//     <div className="bg-blue-900 h-screen flex justify-center">
//             <div className='flex flex-col items-center py-12 w-2/5'>
//             <h1 className='text-4xl font-bold gap-4 text-white'>Patient Registration Form</h1>
//             <input  className='inputBox mt-8 rounded-lg border border-blue-400 outline-none pl-4 py-2' type="text" placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}/>
//             <input className='inputBox mt-8 rounded-lg border border-blue-400 outline-none pl-4 py-2' type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
//             <input className='inputBox mt-8 rounded-lg border border-blue-400 outline-none pl-4 py-2' type='number' placeholder='Enter your Number' onChange={(e)=>setNumber(e.target.value)}/>
//             <input className='inputBox mt-8 rounded-lg border border-blue-400 outline-none pl-4 py-2' type="password" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
//             <div className="flex gap-8">
//             <button className='p-2 appButton rounded-xl text-white bg-blue-400 border border-blue-400 hover:text-black hover:bg-white'type='button' onClick={savePatient}>Sign Up</button>
//             <Link href={'/'} className="hover:border-b border-blue-400 hover:text-blue-400 pb-1" type='button'>Sign In</Link>
//             </div>
//         </div>
//   </div>
//   )
}

export default SignUp