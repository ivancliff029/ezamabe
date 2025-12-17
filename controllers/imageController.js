import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    const { title } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ message: "No image file provided" });
    }
    
    const image = await Image.create({
      title: title || 'Untitled', 
      url: fileUrl 
    });

    res.status(201).json(image);

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error while saving image" });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
};