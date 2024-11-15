require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});