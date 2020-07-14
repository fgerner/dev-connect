const request = require("supertest");
const server = require('../../server');
const faker = require('faker');

const body = {
    "name": "${faker.name()}"
    // email: faker.internet.email(),
    // password: faker.internet.password()
}

describe('Users', () => {
    it('should have a POST users endpoint', async () => {
        const response = await request(server).post('/api/users', body);
        expect(body.status).toEqual(204);
    });
})