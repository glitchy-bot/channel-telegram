import { HttpResponse, HttpRequest } from './request';


export class Broker extends HttpRequest
{
    private url: string;
    private chatId: number;
    private msgId: number;
    private dialog: string;

    public constructor(chatId: number, msgId: number, dialog: string)
    {
        super();

        this.url = 'https://broker.glitchy.now.sh';

        this.chatId = chatId;
        this.msgId = msgId;
        this.dialog = dialog;
    }

    public async emit(): Promise<HttpResponse>
    {
        return await this.request(this.url, {
            envelope: {
                from: this.chatId,
            },
            message: {
                id: this.msgId,
                content: this.dialog,
            }
        });
    }
}
