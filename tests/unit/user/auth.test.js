var supertest = require('supertest');
var should = require('should');

describe('user.auth', function () {

  describe('#User register & login ()', function () {
    describe('#User login()', function () {
      it('should register user given full name, email and password', function (done) {
        supertest(sails.hooks.http.app)
          .post('/user/register')
          .send({ fullName: 'Christine Wanjiru', email: 'wanjirugichuki21@gmail.cm', password: '12345678' })
          .expect(201)
          .end(function (err, res) {
            if (err) return done(err);
            return done();
          });
      });
      it('should not register user given existing email and password', function (done) {
        supertest(sails.hooks.http.app)
          .post('/user/register')
          .send({ fullName: 'Christine Wanjiru', email: 'wanjirugichuki21@gmail.cm', password: '12345678' })
          .expect(400)
          .end(function (err, res) {
            if (err) return done(err);
            return done();
          });
      });
      it('should not register user given wrong email format', function (done) {
        supertest(sails.hooks.http.app)
          .post('/user/register')
          .send({ fullName: 'Christine Wanjiru', email: 'wanjirugichuki21gmail.cm', password: '12345678' })
          .expect(400)
          .end(function (err, res) {
            if (err) return done(err);
            return done();
          });
      });
    });
    describe('#User login()', function () {
      it('should login user given email and password', function (done) {
        supertest(sails.hooks.http.app)
          .post('/user/login')
          .send({ email: 'wanjirugichuki21@gmail.cm', password: '12345678' })
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            var login = res.body.message;

            should.equal(login, 'wanjirugichuki21@gmail.cm has been logged in');
            return done();
          });

      });
      it('should not login user given nonexistent email', function (done) {
        supertest(sails.hooks.http.app)
          .post('/user/login')
          .send({ email: 'wanjirugichuki21@gmail.com', password: '12345678' })
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err);
            var login = res.body.error;

            should.equal(login, 'wanjirugichuki21@gmail.com does not belong to a user');
            return done();
          });

      });
    });
  });

});