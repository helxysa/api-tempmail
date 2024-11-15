const axios = require('axios');

class EmailController {
    constructor() {
        this.baseUrl = 'https://api.guerrillamail.com/ajax.php';
        this.axiosInstance = axios.create({
            timeout: 5000,
            headers: {
                'User-Agent': 'GuerrillaMailAPI-Node'
            }
        });
    }

    async getApiInfo(req, res) {
        return res.json({
            name: 'API de Email Temporário',
            version: '1.0.0',
            description: 'API para criação e gerenciamento de emails temporários',
            endpoints: {
                '/': 'Informações da API',
                '/email': 'Criar novo email temporário',
                '/email/:email/:sid': 'Listar emails recebidos',
                '/email/:email/:sid/:emailId': 'Buscar conteúdo de um email específico'
            }
        });
    }

    async createEmail(req, res) {
        try {
            const response = await this.axiosInstance.get(`${this.baseUrl}?f=get_email_address`);
            
            if (!response.data || !response.data.email_addr) {
                throw new Error('Resposta inválida da API');
            }

            return res.json({
                success: true,
                data: {
                    email: response.data.email_addr,
                    sid: response.data.sid,
                    timestamp: new Date(),
                    expiresIn: '60 minutes'
                }
            });
        } catch (error) {
            console.error('Erro ao criar email:', error);
            return res.status(error.response?.status || 500).json({
                success: false,
                error: 'Erro ao criar email temporário',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    async getEmails(req, res) {
        try {
            const { email, sid } = req.params;

            if (!email || !sid) {
                return res.status(400).json({
                    success: false,
                    error: 'Email e SID são obrigatórios'
                });
            }

            const response = await this.axiosInstance.get(`${this.baseUrl}?f=check_email&sid=${sid}`);

            return res.json({
                success: true,
                data: {
                    emails: response.data.list || [],
                    count: response.data.count || 0
                }
            });
        } catch (error) {
            console.error('Erro ao buscar emails:', error);
            return res.status(error.response?.status || 500).json({
                success: false,
                error: 'Erro ao buscar emails',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    async getEmailContent(req, res) {
        try {
            const { email, sid, emailId } = req.params;

            if (!email || !sid || !emailId) {
                return res.status(400).json({
                    success: false,
                    error: 'Email, SID e ID do email são obrigatórios'
                });
            }

            const response = await this.axiosInstance.get(
                `${this.baseUrl}?f=fetch_email&sid=${sid}&email_id=${emailId}`
            );

            if (!response.data || !response.data.mail_subject) {
                throw new Error('Email não encontrado');
            }

            return res.json({
                success: true,
                data: {
                    subject: response.data.mail_subject,
                    from: response.data.mail_from,
                    body: response.data.mail_body,
                    timestamp: response.data.mail_timestamp
                }
            });
        } catch (error) {
            console.error('Erro ao buscar conteúdo do email:', error);
            return res.status(error.response?.status || 500).json({
                success: false,
                error: 'Erro ao buscar conteúdo do email',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

module.exports = new EmailController();