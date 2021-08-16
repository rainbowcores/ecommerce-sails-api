var supertest = require('supertest');
var should = require('should');

describe('Product CRUD ()', function () {
    describe('#Product create()', function () {
        it('should add product given product name, description and quantity', function (done) {
            supertest(sails.hooks.http.app)
                .post('/product')
                .send({ productName: 'Coca-Cola', description: 'coke', quantity: '3' })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productName = res.body.productName;
                    should.equal(productName, 'Coca-Cola');
                    return done();
                });
        });
        it('should not add product given existing product name', function (done) {
            supertest(sails.hooks.http.app)
                .post('/product')
                .send({ productName: 'Coca-Cola', description: 'coke', quantity: '3' })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
        it('should not add product given quantity =<0 ', function (done) {
            supertest(sails.hooks.http.app)
                .post('/product')
                .send({ productName: 'Fanta', description: 'fanta orange', quantity: '0' })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });
        });
    });
    describe('#Product patch one()', function () {
        it('should get one existing product given id', function (done) {
            supertest(sails.hooks.http.app)
                .patch('/product/1')
                .send({ quantity: 5 })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productQuantity = res.body.quantity;
                    should.equal(productQuantity, 5);
                    return done();
                });

        });
        it('should not patch product given non-existent id', function (done) {
            supertest(sails.hooks.http.app)
                .post('/product/11')
                .send({ description: 'coke zero' })
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        });

    });
    describe('#Product get all()', function () {
        it('should get all products', async function () {
            var numProducts = await Product.count({});
            supertest(sails.hooks.http.app)
                .get('/product')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var products = res.body;
                    should.equal(Object.keys(products).length, numProducts);
                });

        });
    });
    describe('#Product get one()', function () {
        it('should get one existing product given id',async function () {
            var product = await Product.findOne({id:1});
            supertest(sails.hooks.http.app)
                .get('/product/1')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productName = res.body.productName;
                    should.equal(productName, product.productName);
                });

        });
        it('should not get product given non-existent id', function (done) {
            supertest(sails.hooks.http.app)
                .get('/product/11')
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        });

    });
    describe('#Product delete one()', function () {
        it('should delete one existing product given id', async function () {
            var product = await Product.findOne({id:1});
            supertest(sails.hooks.http.app)
                .patch('/product/1')
                .send({ quantity: 5 })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productName = res.body.productName;
                    should.equal(productName, product.productName);
                });

        });
        it('should not delete product given non-existent id', function (done) {
            supertest(sails.hooks.http.app)
                .post('/product/11')
                .send({ description: 'coke zero' })
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        });

    });
});