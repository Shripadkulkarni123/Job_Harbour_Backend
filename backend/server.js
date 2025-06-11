import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px; border-radius: 10px; background-color: #f0f0f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333;">Server is Running Successfully!</h1>
        <p style="color: #666;">The backend server is up and running on port ${process.env.PORT}</p>
      </div>
    </div>
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
