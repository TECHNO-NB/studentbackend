import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  // 1. Student Info
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  age: { type: Number },
  school: { type: String, required: true },
  schoolAddress: { type: String, required: true },

  // 2. Address Details
  province: { type: String, required: true },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  ward: { type: String, required: true },
  fullAddress: { type: String, required: true },

  // 3. Parent Info
  father: { type: String, required: true },
  mother: { type: String, required: true },
  occupation: { type: String, required: true },
  income: { type: String, required: true }, // Storing the range string
  contact: { type: String, required: true },
  whatsapp: { type: String },

  // 4. Scholarship Details
  scholarshipType: { type: String, required: true },
  previous: { type: String, required: true }, // "Yes" or "No"

  // 5. Declaration
  agree: { type: Boolean, required: true },
  studentSign: { type: String, required: true },
  parentSign: { type: String, required: true },

  studentDate: { type: String },
  parentDate: { type: String },

}, { timestamps: true });

export default  mongoose.model('Application', ApplicationSchema);