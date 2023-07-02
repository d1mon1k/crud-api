import http from 'http';
import userDatabase from './repositories/userDatabase';
import dotenv from 'dotenv';
import { TUser } from './types';

dotenv.config();

const app = http.createServer((request, response) => {
    const { headers, method, url } = request;
    const body: Buffer[] = [];

    request.on('error', (e) => {
        // eslint-disable-next-line no-console
        console.error(e);
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', async () => {
        const data: TUser = JSON.parse(Buffer.concat(body).toString());

        await userDatabase.setUser(data);
    });

    response.end('<h1>hello</h1>');
});

app.listen(process.env.PORT || 4000);
