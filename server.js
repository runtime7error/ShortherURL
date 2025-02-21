const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

//   mongodb+srv://luquers223:bPVpf2NWq3L9lmcL@maincluster.fcmnq.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster

app.use(express.json(), cors());

const linksRouter = require('./routes/links');
app.use('/api/links', linksRouter);

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
});