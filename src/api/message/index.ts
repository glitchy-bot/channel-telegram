import { TelegramClient } from '../../lib/telegram';
import { NowRequest, NowResponse } from '@now/node';


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default async function(req: NowRequest, res: NowResponse): Promise<void>
{
    const token: string = process.env.TELEGRAM_TOKEN || '';
    const client = new TelegramClient(token);

    const ownerId: string = process.env.TELEGRAM_OWNER_ID || '';

    const event = req.body;
    const message = event.message;

    const msgId: number = message.message_id;
    const chatId: number = message.chat.id;

    if (chatId === ownerId) {
        const imageUrl = 'https://glitchy.s3.amazonaws.com/nope.gif';
        await client.sendAnimation(chatId, imageUrl, msgId, '*You didn\'t say the magic word!*');

        res.end();
    }

    res.end();
}
