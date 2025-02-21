const express = require("express");
const router = express.Router();
const Link = require("../models/Links");

const BASE_URL = "https://shortherurl-production.up.railway.app/api/links";

router.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "URL é obrigatória" });
  }

  try {
    let link = await Link.findOne({ originalUrl: url });
    if (link) {
      return res.status(200).json({ shortUrl: `${BASE_URL}/${link.shortId}` });
    }

    link = new Link({ originalUrl: url });
    await link.save();

    return res.status(201).json({ shortUrl: `${BASE_URL}/${link.shortId}` });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao salvar o link" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findOne({ shortId: id });

    if (!link) {
      return res.status(404).json({ message: "Link não encontrado" });
    }

    return res.redirect(link.originalUrl);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar o link" });
  }
});

module.exports = router;
