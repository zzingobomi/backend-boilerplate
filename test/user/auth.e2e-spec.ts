import request from 'supertest';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';

describe('Auth Module', () => {
  const app = APP_URL;
  const newUserName = `Tester${Date.now()}`;
  const newUserEmail = `User.${Date.now()}@example.com`;
  const newUserPassword = `secret`;

  describe('Registration', () => {
    it('should fail with exists email: /api/v1/auth/email/register (POST)', () => {
      return request(app)
        .post('/api/v1/auth/email/register')
        .send({
          email: TESTER_EMAIL,
          password: TESTER_PASSWORD,
          userName: 'Tester',
        })
        .expect(422)
        .expect(({ body }) => {
          expect(body.errors.email).toBeDefined();
        });
    });

    it('should successfully: /api/v1/auth/email/register (POST)', async () => {
      return request(app)
        .post('/api/v1/auth/email/register')
        .send({
          email: newUserEmail,
          password: newUserPassword,
          userName: newUserName,
        })
        .expect(204);
    });

    describe('Login', () => {
      it('should successfully with unconfirmed email: /api/v1/auth/email/login (POST)', () => {
        return request(app)
          .post('/api/v1/auth/email/login')
          .send({ email: newUserEmail, password: newUserPassword })
          .expect(200)
          .expect(({ body }) => {
            expect(body.token).toBeDefined();
          });
      });
    });
  });

  describe('Login', () => {
    it('should successfully for user with confirmed email: /api/v1/auth/email/login (POST)', () => {
      return request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .expect(200)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.refreshToken).toBeDefined();
          expect(body.tokenExpires).toBeDefined();
          expect(body.user.email).toBeDefined();
          expect(body.user.hash).not.toBeDefined();
          expect(body.user.password).not.toBeDefined();
          expect(body.user.previousPassword).not.toBeDefined();
        });
    });
  });

  describe('Logged in user', () => {
    let newUserApiToken;

    beforeAll(async () => {
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => {
          newUserApiToken = body.token;
        });
    });

    it('should retrieve your own profile: /api/v1/auth/me (GET)', async () => {
      await request(app)
        .get('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send()
        .expect(({ body }) => {
          expect(body.provider).toBeDefined();
          expect(body.email).toBeDefined();
          expect(body.hash).not.toBeDefined();
          expect(body.password).not.toBeDefined();
          expect(body.previousPassword).not.toBeDefined();
        });
    });

    it('should get new refresh token: /api/v1/auth/refresh (GET)', async () => {
      const newUserRefreshToken = await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => body.refreshToken);

      await request(app)
        .post('/api/v1/auth/refresh')
        .auth(newUserRefreshToken, {
          type: 'bearer',
        })
        .send()
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.refreshToken).toBeDefined();
          expect(body.tokenExpires).toBeDefined();
        });
    });

    it('should update profile successfully: /api/v1/auth/me (PATCH)', async () => {
      const newUserNewName = Date.now();
      const newUserNewPassword = 'new-secret';
      const newUserApiToken = await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => body.token);

      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({
          userName: newUserNewName,
          password: newUserNewPassword,
        })
        .expect(422);

      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({
          userName: newUserNewName,
          password: newUserNewPassword,
          oldPassword: newUserPassword,
        })
        .expect(200);

      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserNewPassword })
        .expect(200)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
        });

      await request(app)
        .patch('/api/v1/auth/me')
        .auth(newUserApiToken, {
          type: 'bearer',
        })
        .send({ password: newUserPassword, oldPassword: newUserNewPassword })
        .expect(200);
    });

    it('should delete profile successfully: /api/v1/auth/me (DELETE)', async () => {
      const newUserApiToken = await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .then(({ body }) => body.token);

      await request(app).delete('/api/v1/auth/me').auth(newUserApiToken, {
        type: 'bearer',
      });

      return request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail, password: newUserPassword })
        .expect(422);
    });
  });
});
