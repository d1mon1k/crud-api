import http from 'http';
import dotenv from 'dotenv';
import { handleRoute } from './server/handle-route';
import { STATUS_CODES } from './constants/status-codes';

dotenv.config();

const app = http.createServer((request, response) => {
    const { url, method, headers } = request;
    const body: Buffer[] = [];

    request.on('error', (e) => {
        console.error(e);
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', async () => {
        try {
            if (headers['content-type'] !== 'application/json') {
                response.statusCode = STATUS_CODES.BAD_REQUEST;
                response.end('Invalid Content-Type. Expected application/json.');
            }

            if (url && method) {
                const data = Buffer.concat(body).toString('utf-8');
                const requestData = { data, url, method };

                const { statusCode, message } = await handleRoute(requestData);

                response.statusCode = statusCode;
                response.setHeader('content-type', 'application/json');
                response.end(JSON.stringify(message));
            }
        } catch (e) {
            console.log(e);
            response.end(JSON.stringify(e));
        }
    });
});

app.listen(process.env.PORT || 4000);
