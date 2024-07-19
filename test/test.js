const request = require('supertest');
const test = require('ava');
const app = require('../index.js');


test('pass Server', (t) => {
    t.pass()
})

test('llenar jarras dado que z_amount_wanted no es multiplo', async (t) => {
    const req = {
        "x_capacity": 22,
        "y_capacity": 6,
        "z_amount_wanted": 5
    }
    	t.timeout(10000); 
    try {
        const response = await request(app)
            .post('/')
            .send(req) // Send the request body
            .expect('Content-Type', /json/)
        if (response.status === 401) {
            t.fail(response.text);
            return done();
        }
        if (response.status === 201) {
            t.truthy(response.body, 'response');
            t.pass()
        }
    } catch (err) {
        t.fail('Request failed');
    }
});


test('llenar jarras dado que z_amount_wanted es multiplo, son positivos y enteros todos sus parametros', async (t) => {
    const req = {
        "x_capacity": 22,
        "y_capacity": 6,
        "z_amount_wanted": 6
    }
    	t.timeout(10000); 
    try {
        const response = await request(app)
            .post('/')
            .send(req) // Send the request body
            .expect('Content-Type', /json/)
        if (response.status === 401) {
            t.fail(response.text);
            return done();
        }
        if (response.status === 201) {
            t.truthy(response.body, 'response');
            t.pass()
        }
    } catch (err) {
        t.fail('Request failed');
    }
});


test('ingresar parametros invalidos', async (t) => {
    const req = {
        "x_capacity": 6,
        "y_capacity": 6,
        "z_amount_wanted": -6
    }
    	t.timeout(10000); 
    try {
        const response = await request(app)
            .post('/')
            .send(req) // Send the request body
            .expect('Content-Type', /json/)
        if (response.status === 401) {
            t.fail(response.text);
            return done();
        }
        if (response.status === 201) {
            t.truthy(response.body, 'response');
            t.pass()
        }
    } catch (err) {
        t.fail('Request failed');
    }
});


test('ingresar valor z_amount_wanted mayor al de las capacidades de x,y', async (t) => {
    const req = {
        "x_capacity": 6,
        "y_capacity": 6,
        "z_amount_wanted": 22
    }
    	t.timeout(10000); 
    try {
        const response = await request(app)
            .post('/')
            .send(req) // Send the request body
            .expect('Content-Type', /json/)
        if (response.status === 401) {
            t.fail(response.text);
            return done();
        }
        if (response.status === 201) {
            t.truthy(response.body, 'response');
            t.pass()
        }
    } catch (err) {
        t.fail('Request failed');
    }
});


test('ruta no valida', async (t) => {
    	t.timeout(10000); 
    try {
        const response = await request(app)
            .get('/2')
            .expect('Content-Type', /json/)
        if (response.status === 404) {
            t.fail(response.text);
            return done();
        }
    } catch (err) {
        t.fail('Request failed');
    }
});
