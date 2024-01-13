import mongoose, {model, Schema, models} from "mongoose";
 
 const DoctorSchema = new Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  fees: { type: Number},
  // category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  slots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Slot'}]
 });

export const Doctor = models.Doctor || model('Doctor', DoctorSchema);