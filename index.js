const TelegramBot = require('node-telegram-bot-api');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const h = require('./helpers');

class TgLogger {
  constructor(token) {
    if (!token) { return console.log('token error'); }
    this.bot = new TelegramBot(token, {polling: true});
    this.adapter = new FileSync('db.json');
    this.db = low(this.adapter);
    this.chatId = this.db.get('chatId').value();
    this.status = this.db.get('status').value();

    this.bot.onText(/\/connect/, (msg) => {
      if (typeof msg.chat.type == 'channel') {
        return console.log('Channels not supported yet...');
      }
      if (!this.status || this.status == false) {
        this.db.set('chatId', msg.chat.id)
          .set('status', true)
          .write()
        this.status = true;
        this.chatId = msg.chat.id;
        this.bot.sendMessage(this.chatId, `👌 *CONNECTED*`, { parse_mode: 'markdown' });
      }
    });

    this.bot.onText(/\/disconnect/, (msg) => {
      if (this.status == true) {
        this.bot.sendMessage(this.chatId, `👋 *DISCONNECTED*`, { parse_mode: 'markdown' });
        this.db.set('chatId', 0)
          .set('status', false)
          .write()
        this.status = false;
        this.chatId = 0;
      }
    });

  }

  text(message) {
    if (!h.isChatId(this.chatId)) { return; }
    if (!h.isMessage(message)) { return; }
    this.bot.sendMessage(this.chatId, message, { parse_mode: 'markdown' });
  }

  info(message) {
    if (!h.isChatId(this.chatId)) { return; }
    if (!h.isMessage(message)) { return; }
    const toSend = `ℹ *INFO*\n${message}`;
    this.bot.sendMessage(this.chatId, toSend, { parse_mode: 'markdown' });
  }

  err(message) {
    if (!h.isChatId(this.chatId)) { return; }
    if (!h.isMessage(message)) { return; }
    const toSend = `🚫 *ERROR*\n${message}`;
    this.bot.sendMessage(this.chatId, toSend, { parse_mode: 'markdown' });
  }

  warn(message) {
    if (!h.isChatId(this.chatId)) { return; }
    if (!h.isMessage(message)) { return; }
    const toSend = `⚠️ *WARNING*\n${message}`;
    this.bot.sendMessage(this.chatId, toSend, { parse_mode: 'markdown' });
  }

  success(message) {
    if (!h.isChatId(this.chatId)) { return; }
    const toSend = message ? `✅ *SUCCESS*\n${message}` : `✅ *SUCCESS*`;
    this.bot.sendMessage(this.chatId, toSend, { parse_mode: 'markdown' });
  }

  failed(message) {
    if (!h.isChatId(this.chatId)) { return; }
    const toSend = message ? `❌ *FAILED*\n${message}` : `❌ *FAILED*`;
    this.bot.sendMessage(this.chatId, toSend, { parse_mode: 'markdown' });
  }
}

module.exports = TgLogger;
