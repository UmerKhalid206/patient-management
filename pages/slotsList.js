import Layout from "@/components/Layout";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from "@/components/Modal";

export default function SlotsList() {
  const [doctors,setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [slot, setSlot] = useState(undefined)
  // let _id;
  useEffect(() => {
    axios.get('/api/doctor/register').then(response => {
      // console.log(response.data)
      setDoctors(response.data);
    });
  }, []);

  
   

   async function handleDelete(slot){
    // console.log(slot)
    setSlot(slot) 

    setShowModal(true)
   }

   function updateFlag(flag){
    setShowModal(flag)
   }

   function afterDelete(id){
    if(id){
      axios.get('/api/doctor/register').then(response => {
        setDoctors(response.data);
      });
    }

   }

  return (
    <Layout>
{showModal?  <Modal type={"Slot"} slot={slot} updateFlag={updateFlag} deleted={afterDelete}/> : null}
      <div>
        
        <div className="flex justify-center">
        <h1 className="font-bold">Doctors Added Slots</h1>
        </div>
        <div className="flex flex-col gap-4">
        {doctors.map(doc => (
            <div key={doc._id} className="border rounded-md p-2">
                <h1 className="font-bold">{doc.name}&#39;s slots:</h1>
                <div className="flex flex-wrap gap-8">
                {doc.slots.map(slot => (
                    <div className={`flex border rounded-lg`} key={slot._id}>
                    <div className={`${slot.booked===true ? 'pointer-events-none bg-gray-300 text-gray-400' : 'hover:bg-black hover:text-white '} flex justify-between gap-2  cursor-pointer px-2 py-1 rounded-s-md`} >
                      <span>{slot.startTime}</span> - <span>{slot.endTime}</span>
                    </div>
                    <div className="flex">
                        
                        <button onClick={() => handleDelete(slot)} className="border-black px-1 bg-red-500 hover:bg-red-600 text-gray-100 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4">
                        <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                        </svg>
                        </button>
                        
                        {/* <span className="border-r"></span> */}
                        <button className="px-1 bg-blue-500 hover:bg-blue-600 rounded-e-md text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        </button>
                        </div> 
                    </div>
                    ))}
                </div>
                <div>

                </div>
            </div>
        ))}
        </div>
      </div>
    </Layout>
  );
}