const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = '7205861679:AAHcVyq1FCCLyjAf2EVBB5gatJt_fLN2u4Y';
const TELEGRAM_API = `https://api.telegram.org/bot$7205861679:AAHcVyq1FCCLyjAf2EVBB5gatJt_fLN2u4Y`;

app.use(bodyParser.json());

// Set up webhook
app.post('/webhook', async (req, res) => {
    const { message } = req.body;
    if (message && message.text) {
        const chatId = message.chat.id;
        const text = message.text.toLowerCase();
        
        if (text === '/start') {
            await sendMessage(chatId, 'Welcome! Connect your MetaMask wallet here: [Connect MetaMask](YOUR_FRONTEND_URL)');
        }
    }
    res.sendStatus(200);
});

const sendMessage = async (chatId, text) => {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    setWebhook();
});

const setWebhook = async () => {
    const url = `https://YOUR_DOMAIN/webhook`;
    await axios.post(`${TELEGRAM_API}/setWebhook`, { url });
    console.log('Webhook set');
};
