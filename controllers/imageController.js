import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const image = await Image.create({
    title: req.body.title,
    url: fileUrl
  });

  res.json(image);
};

export const getImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
};
