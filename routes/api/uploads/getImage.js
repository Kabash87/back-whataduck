const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

// Ruta para servir imágenes subidas por el usuario
// GET /uploads/:imageName
router.get("/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;
    // Buscar un anuncio que contenga la imagen en la URL
    const advert = await Advert.findOne({ photo: { $regex: imageName } });
    if (!advert || !advert.photo) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }
    // Redirigir a la URL de Cloudinary
    return res.redirect(advert.photo);
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener la imagen" });
  }
});

module.exports = router;
