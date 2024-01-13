import { Doctor } from "@/models/Doctor";
import { Slot } from "@/models/Slots";
import {mongooseConnect} from "@/lib/mongoose";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    // await isAdminRequest(req,res);
  
    if (method === 'GET') {
      try {
        const doctors = await Doctor.find({}).populate('slots')
        res.json(doctors);
      } catch (error) {
        // Handle the error appropriately
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
      }
    }
  
    if (method === 'POST') {
      const {name,specialization,fees} = req.body;
      // console.log(slots)
      const newDoctor = await Doctor.create({
        name,
        specialization,
        fees
      });
      res.json(newDoctor);
    }
  
    if (method === 'PUT') {
      const {_id, name, specialization,fees, slots} = req.body;
      const updateDoc = await Doctor.updateOne({_id},{
        name,
        specialization,
        fees,
        slots
      });
      res.json(updateDoc);
    }
    // if (method === 'DELETE') {
    //   const {_id} = req.query;
    //   await Category.deleteOne({_id});
    //   res.json('ok');
    // }
  }