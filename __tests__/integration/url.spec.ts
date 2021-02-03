
import request from 'supertest';
import express from 'express';

const app = express();

describe('/health', () => {
    it('check affirm that the service is up and running', async () => {
        const response: any =  await request('http://localhost:3000').get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Url shortner service is running 🚀');
    });

    it('should encode long url and decode the shortened url should get the original url', async () => {
        const response: any = request('http://localhost:3000')
            .post('/encode')
            .send({url: 'hello.twehtweh.com/sdfdsjkwerewefwr'})
            .then(async (response: any) => {
                expect(response.statusCode).toBe(200);
                expect(response.status).toBeTruthy();
                expect(response.data).toBeDefined();

                const decodeRequest: any = await request('http://localhost:3000')
                .post('/decode')
                .send({ url: response.data.url });

                expect(decodeRequest.statusCode).toBe(200);
                expect(decodeRequest.status).toBeTruthy();
                expect(decodeRequest.data.url).toBeDefined();
                expect(decodeRequest.data.url.originalUrl).toBeDefined();
            });
    });

    it('should encode long url and decode the shortened url should fail on wrong slug code provision', async () => {
        const response: any = request('http://localhost:3000')
            .post('/encode')
            .send({url: 'hello.twehtweh.com/sdfdsjkwerewefwr'})
            .then(async (response: any) => {
                expect(response.statusCode).toBe(200);
                expect(response.status).toBeTruthy();
                expect(response.data).toBeDefined();

                const decodeRequest: any = await request('http://localhost:3000')
                .post('/decode')
                .send({ url: 'invalid_slug' });

                expect(decodeRequest.statusCode).toBe(404);
                expect(decodeRequest.status).toBeFalsy();
                expect(decodeRequest.data.url).toBeNull();
            });
    });
});
