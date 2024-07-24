const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your bot token from BotFather
const token = '6549070771:AAGmJMkRK7zCfejSv5hhfMyy7LzhZduOdsA';
const bot = new TelegramBot(token, { polling: true });

// Define a simple command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the bot! Use /callback to trigger a callback.');
});

// Define a callback command
bot.onText(/\/callback/, (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Press me',
            callback_data: 'button_pressed'
          }
        ]
      ]
    }
  };
  bot.sendMessage(chatId, 'Press the button below:', options);
});

// Handle callback query
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  bot.sendMessage(message.chat.id, 'Button was pressed!');
});
