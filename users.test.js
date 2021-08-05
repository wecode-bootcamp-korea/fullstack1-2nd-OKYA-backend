import request from 'supertest';
import prisma from './prisma';
import app from './app';
import { users } from './testData/test.js';

describe('signup', () => {
  test('create user success', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        email: 'hello',
        password: 'hello',
        name: 'hello',
        phoneNumber: 'hello',
        roadAddress: 'hello',
        detailAddress: 'hello',
        zipCode: 'hello',
      })
      .set('Accept', 'application/json')
      .expect(201, { message: 'USER_CREATED_SUCCESSFULLY' })
      .end(done);
  });

  test('create user key error', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        email: 'hello',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message:
          'KEY_ERROR password,name,phoneNumber,roadAddress,detailAddress,zipCode',
      })
      .end(done);
  });

  test('create user key error', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        password: 'hello',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message:
          'KEY_ERROR email,name,phoneNumber,roadAddress,detailAddress,zipCode',
      })
      .end(done);
  });

  test('create user key error', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        email: 'hello',
        password: 'hello',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'KEY_ERROR name,phoneNumber,roadAddress,detailAddress,zipCode',
      })
      .end(done);
  });

  test('create user existing user', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        email: 'hello',
        password: 'hello',
        name: 'hello',
        phoneNumber: 'hello',
        roadAddress: 'hello',
        detailAddress: 'hello',
        zipCode: 'hello',
      })
      .set('Accept', 'application/json')
      .expect(409, { message: 'ALREADY_EXISTING_USER' })
      .end(done);
  });
  afterAll(async () => {
    await prisma.user.deleteMany();
  });
});

describe('login', () => {
  beforeAll(async () => {
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );
  });

  test('user login with validated token', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'hi everyone',
      password: 'hi everyone',
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toMatch('eyJhbGci');
    expect(res.body.message).toBe('LOGIN_SUCCESS!');
  });

  test('use login key error', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: 'hi everyone',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'KEY_ERROR',
      })
      .end(done);
  });

  test('use login key error', (done) => {
    request(app)
      .post('/users/login')
      .send({
        password: 'hi everyone',
      })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'KEY_ERROR',
      })
      .end(done);
  });
  afterAll(async () => {
    await prisma.user.deleteMany();
    prisma.$disconnect();
  });
});
