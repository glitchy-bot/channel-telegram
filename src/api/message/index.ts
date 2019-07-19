import { Broker } from '../../lib/broker';
import { TelegramClient } from '../../lib/telegram';

import { NowRequest, NowResponse } from '@now/node';


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default async function(req: NowRequest, res: NowResponse): Promise<void>
{
    const message = req.body.message;

    const dialog: string  = message.text;
    const msgId: number   = message.message_id;
    const chatId: number  = message.chat.id;
    const ownerId: number = Number(process.env.TELEGRAM_OWNER_ID) || 0;

    if (chatId !== ownerId) {
        const imageUrl = 'https://glitchy.s3.amazonaws.com/nope.gif';

        const token  = process.env.TELEGRAM_TOKEN || '';
        const client = new TelegramClient(token);
        await client.sendAnimation(chatId, imageUrl, msgId, '*You didn\'t say the magic word!*');

        res.end();
    }

    const broker = new Broker(chatId, msgId, dialog);
    await broker.emit();

    res.end();
}
