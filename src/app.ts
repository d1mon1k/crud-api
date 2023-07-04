import http from 'http';
import dotenv from 'dotenv';
import { handleRoute } from './server/handle-route';
import { STATUS_CODES } from './constants/status-codes';

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
        try {
            if (url && method) {
                const data = Buffer.concat(body).toString('utf-8');
                const requestData = { data, url, method };
                const { statusCode, message } = await handleRoute(requestData);

                response.setHeader('content-type', 'application/json');
                response.statusCode = statusCode;
                response.end(JSON.stringify(message));
            }
        } catch {
            const serverError = 'An internal server error occurred while processing your request';

            response.statusCode = STATUS_CODES.SERVER_ERROR;
            response.end(JSON.stringify(serverError));
        }
    });
});

app.listen(process.env.PORT);
