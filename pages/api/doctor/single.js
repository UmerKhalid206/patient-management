import { Doctor } from "@/models/Doctor";
import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;         //when we have request to this api url which is /api/products we can check whether the request method is GET, POST, DELETE etc
  await mongooseConnect();
//   await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Doctor.findOne({_id:req.query.id}));
    } else {
      res.json("no data");
    }
  }

//   if (method === 'POST') {
//     console.log(req.body)
//     const {title,description,price
//         // ,images,category,properties
//     } = req.body;
//     const productDoc = await Product.create({
//       title,description,price,
//     //   images,category,properties,
//     })
//     res.json(productDoc);
//   }

//   if (method === 'PUT') {
//     console.log('put chala', req.body)
//     const {title,description,price,images,category,properties,_id} = req.body;
//     await Product.updateOne({_id}, {title,description,price,images,category,properties});
//     res.json(true);
//   }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Doctor.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}