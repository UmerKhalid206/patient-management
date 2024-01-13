import mongoose, { Schema, models} from "mongoose";


const SlotSchema = new Schema({
    date:{type: String},
    startTime: { type: String,  },
    endTime: { type: String, },
    booked: { type: Boolean, default: false },
    doctor:{type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
   });

 const Slot = models.Slot || mongoose.model('Slot', SlotSchema);

 export default Slot;