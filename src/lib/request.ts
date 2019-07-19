import axios from 'axios';


export interface HttpRequestPayload
{
    url: string;
    baseURL?: string;
    method: string;
    headers: object;
    data?: object;
    params?: object;
}

export interface HttpResponse
{
    error: boolean;
    response: object;
}

async function perform(payload: HttpRequestPayload): Promise<HttpResponse>
{
    let error = false;
    let response: object;

    try {
        response = await axios(payload);
    }
    catch (e) {
        error = true;
        response = e;
    }

    const ret: HttpResponse = { error, response }
    return ret;
}

export class HttpRequest
{
    private headers: object;

    public constructor()
    {
        this.headers = {
            'content-type': 'application/json',
        }
    }

    protected async request(url: string, data: object, method = 'post'): Promise<HttpResponse>
    {
        const payload: HttpRequestPayload = { url, method, headers: this.headers }

        if (data) {
            if (method === 'get') {
                payload.data = data;
            }
            else {
                payload.params = data;
            }
        }

        return await perform(payload);
    }
}
