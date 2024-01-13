import { Doctor } from "@/models/Doctor";
import Slot from "@/models/Slots";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    // await isAdminRequest(req,res);
  
    if(method === 'GET'){
        if (req.query?.id) {
            let doc = await Slot.findOne({_id:req.query.id})
            // console.log(doc)
            res.send(doc)
          }else {
            res.send(await Slot.find())
          }
         
    }
   
  
    if (method === 'POST') {
      const {startTime, endTime, docId } = req.body;
      console.log(req.body)
      let newSlot = await Slot({
        startTime,
        endTime,
        doctor: docId
      });
      newSlot = await newSlot.save()
      console.log(newSlot)
      if(newSlot){
        let doc = await Doctor.findOne({_id: docId})
        let newSlots = doc.slots
        newSlots.push(newSlot);
        console.log(newSlots)
            const updateDoc = await Doctor.updateOne({_id: docId},{
              slots: newSlots
    })
            res.json(updateDoc);
          }
      }

      if (method === 'PUT') {
        const {slotId} = req.body;
        // console.log(slotId)
        // return;
        const updateSlotStatus = await Slot.updateOne({_id: slotId},{
          booked: true
        });
        res.status(200).json(updateSlotStatus);
      }

  
    
  
    if (method === 'DELETE') {
      
      const {id} = req.query;
      console.log(id)
      try {
      let del = await Slot.deleteOne({_id: id})
      res.status(200).json(del)
      } catch (error) {
        res.status(500).json(error)
      }
    }
  }