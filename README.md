# Telegram Bot Logger
Good for logging your actions to [Telegram](https://telegram.org) chat/group/supergroup.
Now supports sending `String` type of messages only (also supports Markdown).

## Install

1. Create bot and get bot token from [@botfather](https://t.me/botfather);
2. _(optional)_ Add your bot to group/supergroup and make it an admin without any admin permissions (bot need to read the first message);
3. `npm i -s tglogger`

## Use
Send the bot command `/start` to bot or just write something to the group/supergroup to which you added the bot. Bot will send you message when it will save `chatId`.

    const TgLogger = require('tglogger');
    const tg = new TgLogger('TELEGRAM_BOT_TOKEN');

    tg.text('_Lorem_ *ipsum* \`dolor\`.');
    tg.info('_Lorem_ *ipsum* \`dolor\`.');
    tg.err('_Lorem_ *ipsum* \`dolor\`.');
    tg.warn('_Lorem_ *ipsum* \`dolor\`.');
    tg.failed();
    tg.failed('_Lorem_ *ipsum* \`dolor\`.');
    tg.success();
    tg.success('_Lorem_ *ipsum* \`dolor\`.');

## Commands

    /connect

Use to connect bot to the chat/group/supergroup.

    /disconnect

Use to disconnect from the chat/group/supergroup.