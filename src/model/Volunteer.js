import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    // 1. Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    gender: {
      type: String,
      // Note: We are not using 'enum' here because your frontend sends 
      // different values based on language (e.g., "Male" or "पुरुष")
      required: true,
    },
    dob: {
      type: String, // Storing as String to match input type="date" value
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
    },

    // 2. Address Details
    province: { type: String, required: true },
    district: { type: String, required: true },
    municipality: { type: String, required: true },
    ward: { type: String, required: true },
    fullAddress: { type: String, required: true },

    // 3. Education & Profession
    qualification: { type: String, required: true },
    profession: { type: String, required: true },

    // 4. Volunteering Preferences
    role: { type: String, required: true },
    availability: { type: String, required: true },
    experience: { type: String }, // Stores "Yes"/"No" or "छ"/"छैन"

    // 5. Declaration & Signature
    agree: {
      type: Boolean,
      required: true,
      default: false,
    },
    applicantSign: {
      type: String, 
      required: true,
      // Note: This stores the Base64 image string. 
      // For production, it is better to upload to S3/Cloudinary and store the URL here.
    },
    date: {
      type: String, // The date selected by the user in the form
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Volunteer || mongoose.model("Volunteer", VolunteerSchema);