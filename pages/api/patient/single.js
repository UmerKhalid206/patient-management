import { Patient } from "@/models/Patient";
import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handle(req, res) {
  const {method} = req;         //when we have request to this api url which is /api/products we can check whether the request method is GET, POST, DELETE etc
  await mongooseConnect();
//   await isAdminRequest(req,res);

  if (method === 'GET') {
    console.log(req.query)
    if (req.query?.id) {
      let user = await Patient.findOne({_id:req.query.id}, { password: 0 });
      res.status(200).json(user)
    } else {
      res.status(400).json("no data");
    }
  }

  if (method === 'POST') {
    const {email,password} = req.body;
    // console.log(email, password)
    const secret = process.env.SECRET;
    try {
      const patient = await Patient.findOne({email})
      if(patient && bcrypt.compareSync(password, patient.password)) {      //comparing the user entered password with the passwordHash that comes from database in user constant
        const token = jwt.sign(           //when the user is authenticated
            {
                userId: patient._id,      //this generated token will have userId that we are passing here encoded in it    //the user id that we get from the user constant using req.body.email 
            },
            secret,                   //the secret key to generate token
            {expiresIn: '1d'}        //third parameter of the sign method is options and in that option i have the expiry time
        )
            res.status(200).send({user: patient._id, auth: token})    //sending the useremail as user and token for now
        }else{
          res.status(400).send('Invalid Credentials');
      }
    } catch (error) {  
      return res.status(400).send('The patient not found');
    }


    
  }

//   if (method === 'PUT') {
//     console.log('put chala', req.body)
//     const {title,description,price,images,category,properties,_id} = req.body;
//     await Product.updateOne({_id}, {title,description,price,images,category,properties});
//     res.json(true);
//   }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Patient.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}