import axios from 'axios';


interface RequestPayload
{
    url: string;
    baseURL?: string;
    method: string;
    headers: object;
    data?: Message;
    params?: Message;
}


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


export interface Response
{
    error: boolean;
    response: object;
}


async function _request(payload: RequestPayload): Promise<Response>
{
    try {
        const res: Response = { error: false, response: await axios(payload) }
        return res;
    }
    catch (err) {
        const res: Response = { error: true, response: err }
        return res;
    }
}


export class TelegramClient
{
    private token: string;
    private baseURL: string;
    private headers: object;

    public constructor(token: string)
    {
        this.token = `bot${token}`;
        this.baseURL = 'https://api.telegram.org';
        this.headers = {
            'content-type': 'application/json',
        };
    }

    private async perform(url: string, content: Message, method: string = 'post'): Promise<Response>
    {
        url = `${this.baseURL}/${this.token}/${url}`;

        const payload: RequestPayload = { url, method, headers: this.headers }

        if (content) {
            if (method === 'get')
                payload.data = content;
            else
                payload.params = content;
        }

        return await _request(payload);
    }

    public async sendAnimation(chatId: number, imageUrl: string, msgId?: number, caption?: string): Promise<Response>
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

        return await this.perform('sendAnimation', msg);
    }
}
