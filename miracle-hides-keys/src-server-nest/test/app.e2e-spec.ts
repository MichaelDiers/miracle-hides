import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  [
    { data: { type: 'RSA', rsaKeySize: '1024' }, matchPrivate: /^-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----\s*$/gms, matchPublic: /^-----BEGIN RSA PUBLIC KEY-----.+-----END RSA PUBLIC KEY-----\s*$/gms },
    { data: { type: 'RSA', rsaKeySize: '2048' }, matchPrivate: /^-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----\s*$/gms, matchPublic: /^-----BEGIN RSA PUBLIC KEY-----.+-----END RSA PUBLIC KEY-----\s*$/gms },
    { data: { type: 'RSA', rsaKeySize: '4096' }, matchPrivate: /^-----BEGIN RSA PRIVATE KEY-----.+-----END RSA PRIVATE KEY-----\s*$/gms, matchPublic: /^-----BEGIN RSA PUBLIC KEY-----.+-----END RSA PUBLIC KEY-----\s*$/gms },
    { data: { type: 'EC', ecNamedCurve: 'sect239k1' }, matchPrivate: /^-----BEGIN EC PRIVATE KEY-----.+-----END EC PRIVATE KEY-----\s*$/gms, matchPublic: /^-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----\s*$/gms },
    { data: { type: 'AES', aesKeySize: '128' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
    { data: { type: 'AES', aesKeySize: '192' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
    { data: { type: 'AES', aesKeySize: '256' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
    { data: { type: 'HMAC', hmacKeySize: '8' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
    { data: { type: 'HMAC', hmacKeySize: '64' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
    { data: { type: 'HMAC', hmacKeySize: '512' }, matchPrivate: /^[0-9a-f]+$/gms, matchPublic: '' },
  ].forEach(({ data, matchPrivate, matchPublic }) => {    
    const name = Object.values(data).map((value) => value).join(' ');
    it(`/keys (POST) ${name}`, async () => {
      const response = await request(app.getHttpServer())
        .post('/keys')
        .send(data)
        .expect(200);

      expect(response.body.privateKey).toMatch(matchPrivate);

      if (matchPublic) {
        expect(response.body.publicKey).toMatch(matchPublic);
      }
    });  
  });
});
