require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use(express.json());
app.use(cors());

const linksRouter = require('./routes/links');
app.use('/api/links', linksRouter);

app.listen(port, () => console.log(`API rodando na porta ${port}`));