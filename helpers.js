function isChatId(chatId) {
  if (chatId != 0 && chatId != '' && typeof chatId != 'undefined') {
    return true;
  } else {
    console.error('chatId error!');
    return false;
  }
}

function isMessage(message) {
  if (message.length > 0 && typeof message == 'string') {
    return true;
  } else {
    console.error('message error!');
    return false;
  }
}

module.exports = {
  isChatId,
  isMessage
}
