import http from 'http';
import database from './src/repositories/database';

const app = http.createServer((request, response) => {
    const { headers, method, url } = request;
    const body = [];

    request.on('error', (e) => {
        // eslint-disable-next-line no-console
        console.error(e);
    });

    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', () => {
        const data = Buffer.concat(body).toString();

        database.setEntry(data, data);
    });
});

app.listen(process.env.PORT || 4000);
