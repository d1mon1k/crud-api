import http from 'http';
import dotenv from 'dotenv';
import { handleRoute } from './server/handle-route';

dotenv.config();

const app = http.createServer((request, response) => {
    const { url, method } = request;
    const body: Buffer[] = [];

    request.on('error', (e) => {
        console.error(e);
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', async () => {
        if (url && method) {
            const data = Buffer.concat(body).toString();
            const requestData = { data, url, method };

            const { statusCode, message } = handleRoute(requestData);

            response.statusCode = statusCode;
            response.end(JSON.stringify(message));
        }
    });
});

app.listen(process.env.PORT || 4000);
