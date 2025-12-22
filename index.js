import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js"
import Application from "./src/model/Application.js";



// Load .env variables
dotenv.config();

const PORT = process.env.PORT || 4000;



connectDB().then(() => {
  console.log("MongoDB connected successfully");
 
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});


// POST: Submit Application
app.post('/api/register', async (req, res) => {
  try {
    const formData = req.body;
    const { name, dob } = formData;

    // --- VALIDATION START ---
    
    // 1. Check if name or dob is missing in the request
    if (!name || !dob) {
      return res.status(400).json({
        success: false,
        error: "Name and Date of Birth are required fields."
      });
    }

    // 2. Check if an application already exists with this Name AND DOB
    // We use regular expressions for 'name' to make it case-insensitive (e.g., "John" vs "john")
    const existingApplication = await Application.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") }, 
      dob: dob.trim() 
    });

    if (existingApplication) {
      return res.status(409).json({ // 409 Conflict
        success: false,
        error: 'An application has already been submitted for this student.'
      });
    }
    // --- VALIDATION END ---

    const newApplication = new Application(formData);
    const savedApplication = await newApplication.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: savedApplication
    });

  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application. Please try again.'
    });
  }
});

// GET: Retrieve all applications (Optional - for admin panel)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});


app.get("/", (req, res) => {
  return res.json("Youth earning server is running successfully");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
