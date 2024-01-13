// 'use client'
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast';
import Image from 'next/image'
import io from 'socket.io-client'
let socket;


const Card = ({data, recall}) => {
  
   const {slots} = data
   const [flag,setFlag]=useState(false)
   const [btnDis,setBtnDis]=useState('')
   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

   socket = io()

   useEffect(() => {
    
   })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() =>{ socketInitializer()}, [])

   const socketInitializer = async () => {
    await fetch('/api/socket');
    // socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      recall(msg) 
    })
  }
   
   async function changeStatus(slot){
    let id = slot._id
  socket.emit('input-change', id )

    let a = await axios.put('/api/slots', {slotId: slot._id})
    // setIsButtonDisabled(true)

    if(a.status === 200){
        socket.emit('input-change', slot._id)
        // setIsButtonDisabled(true)
        // setBtnDis('text-gray-500 bg-gray-200 hover:bg-gray-200 hover:text-gray-500') 
    }

    toast.success(`You booked it!`);
   }

   socket.on('update-input', msg => {
    recall(msg) 
  })


  function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  }

  let doctor = {
    name : capitalizeFirstLetter(data.name),
    specialization: capitalizeFirstLetter(data.specialization)
  }


  return (

    <div className=' md:h-full bg-white p-2 rounded-lg px-4 w-full shadow-lg'>
        <div className='flex flex-col'>
        <Image
      src="/doctor.webp"
      width={70}
      height={70}
      alt="Picture of the author"
      className='bg-slate-300 rounded-full relative top-[-2.5rem]'
      />
      <div className='-mt-12'>
        <div className='md:text-lg lg:font-bold text-center -mt-4'>{doctor.name}</div>

        <div className='text-gray-400 text-center mt-3'>{doctor.specialization}</div>
            
            <div className='flex justify-center gap-2 md:gap-8'>
        <div className='text-gray-400 text-center'>PKR: {data.fees}</div>
            </div>
        </div>
        </div>
        <div>
           <div className='text-lg font-bold border-b border-gray-400 pb-2 mb-2 lg:text-xl'>Slots:</div>  
            <div className='flex gap-1 md:gap-4 flex-wrap'>
            {slots.length ? slots.map((slot) =>
    <button
        onClick={() => changeStatus(slot)}
        disabled={slot.booked === true}
        className={` border text-sm px-2 py-1 md:px-4 md:py-2 rounded-lg ${slot.booked === true ? 'text-gray-500 bg-gray-200' : 'hover:bg-black hover:text-white'}`}
        key={slot._id}
    >
        {`${slot.startTime} - ${slot.endTime}`}
    </button>)
    :
    <div className='text-sm'>No Slot Available</div>
}
                
            </div>    
        </div>
    </div>
  )
}

export default Card