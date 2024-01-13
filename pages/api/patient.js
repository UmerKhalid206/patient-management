import {Patient} from "@/models/Patient";
import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export default async function handle(req, res) {
  const {method} = req;         //when we have request to this api url which is /api/products we can check whether the request method is GET, POST, DELETE etc
  await mongooseConnect();
//   await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Patient.findOne({_id:req.query.id}));
    } else {
      res.json(await Patient.find());
    }
  }

  if (method === 'POST') {
      
      const {name,email,phone, password} = req.body;
    //   console.log(name,email,phone, password )
    let patient = new Patient({
        name,
        email,
        password: bcrypt.hashSync(password, 10),     //hashing the password using the bcryptjs library, whereas 10 is the salt its like a secret you can use anything here
        phone
    }) 

    patient = await patient.save();
    if(!patient)               //if we not have any responds from backend means its not saved then
    return res.status(403).json('the patient cannot be created')

    res.status(201).json(patient); 
  }

  if (method === 'PUT') {
    console.log('put chala', req.body)
    const {title,description,price,images,category,properties,_id} = req.body;
    await Patient.updateOne({_id}, {title,description,price,images,category,properties});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Patient.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}