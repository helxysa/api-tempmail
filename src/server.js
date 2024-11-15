require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'API de Email Temporário',
        version: '1.0.0',
        description: 'API para criação e gerenciamento de emails temporários',
        endpoints: {
            '/': 'Informações da API',
            '/api/email': 'Criar novo email temporário (POST)',
            '/api/email/:email/:sid': 'Listar emails recebidos (GET)',
            '/api/email/:email/:sid/:emailId': 'Buscar conteúdo de um email específico (GET)'
        }
    });
});

app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});