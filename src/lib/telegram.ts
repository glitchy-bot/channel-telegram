import { HttpResponse, HttpRequest } from './request';


interface Message
{
    chat_id: number;
    reply_to_message_id?: number;
    parse_mode?: string;
    caption?: string;
}

interface AnimationMessage extends Message
{
    animation: string;
}

export class TelegramClient extends HttpRequest
{
    private url: string;

    public constructor(token: string)
    {
        super();
        this.url = `https://api.telegram.org/bot${token}`;
    }

    public async sendAnimation(chatId: number, imageUrl: string, msgId?: number, caption?: string): Promise<HttpResponse>
    {
        /* eslint-disable @typescript-eslint/camelcase */
        const msg: AnimationMessage = {
            chat_id: chatId,
            animation: imageUrl
        }

        if (caption) {
            msg.parse_mode = 'Markdown';
            msg.caption = caption;
        }

        if (msgId) {
            msg.reply_to_message_id = msgId;
        }
        /* eslint-enable */

        return await this.request(`${this.url}/sendAnimation`, msg);
    }
}
