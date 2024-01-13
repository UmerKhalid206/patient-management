import mongoose, {model, Schema, models} from "mongoose";

 const PatientSchema = new Schema({
  name: { type: String},
  email: { type: String},
  phone: { type: Number},
  password: { type: String},
  
 });

export const Patient = models.Patient || model('Patient', PatientSchema);