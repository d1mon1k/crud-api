import http from 'http';
import dotenv from 'dotenv';
import { handleRoute } from './server/handle-route';

dotenv.config();

const app = http.createServer((request, response) => {
    const { url } = request;
    const body: Buffer[] = [];

    request.on('error', (e) => {
        console.error(e);
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', async () => {
        const convertedBody = Buffer.concat(body).toString();
        const { statusCode, message } = handleRoute(url, convertedBody);

        response.statusCode = statusCode;
        response.end(JSON.stringify(message));
    });
});

app.listen(process.env.PORT || 4000);
