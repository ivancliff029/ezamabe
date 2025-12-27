import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000"));
    app.use(cors({
      origin: [
        "http://localhost:3000",
        "https://ezama-steward.vercel.app"
      ],
      credentials: true
    }));
  })
  .catch(err => console.log(err));
