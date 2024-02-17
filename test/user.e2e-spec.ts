import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import resetDB from './helpers/resetDB';
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let user;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    await resetDB();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/user (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/user')
      .send({ name: 'Henrique', age: 22, email: 'test@example.com' })
      .expect(201);
    user = result.body;
    expect(result.body).toBeDefined();
    expect(result.body.name).toEqual('Henrique');
    expect(result.body.age).toEqual(22);
  });

  it('/user (GET)', async () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200, [
        { id: user.id, name: user.name, age: user.age, email: user.email },
      ]);
  });

  it('/user/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/user/${user.id}`)
      .expect(200)
      .expect(user);
  });
});
