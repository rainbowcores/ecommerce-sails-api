var supertest = require('supertest');
var should = require('should');


describe('Order Functionality ()', function () {

    describe('# Place Order()', function () {

        it('should add products to order given product id and quantity and user id', async function () {
            var user = await User.create({
                fullName: "Christine Wanjiru",
                email: "wanjirugichuki22@gmail.bom",
                password: "01234567"
            }).fetch();
            var product = await Product.create({
                productName: "Fantax",
                description: "Orange",
                quantity: 10
            }).fetch();
            supertest(sails.hooks.http.app)
                .post('/order')
                .send({
                    "userid": user.id,
                    "status": "Open",
                    "products": [
                        {
                            "productid": product.id,
                            "quantity": 3
                        }
                    ]

                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return err
                    var productName = res.body.data.products[0].product.productName;
                    should.equal(productName, product.productName);
                });
        });
    });
    describe('# Complete Order()',  function () {

        it('should complete order given order id', async function () {
            var user = await User.create({
                fullName: "Christine Wanjiru",
                email: "wanjirugichuki22@gmai.dom",
                password: "01234567"
            }).fetch();
            var product = await Product.create({
                productName: "Fantasx",
                description: "Orange",
                quantity: 10
            }).fetch();
            supertest(sails.hooks.http.app)
                .post('/order')
                .send({
                    "userid": user.id,
                    "status": "Completed",
                    "products": [
                        {
                            "productid": product.id,
                            "quantity": 3
                        }
                    ]

                })
                .end(function (err, res) {
                    if (err) return err
                });

            supertest(sails.hooks.http.app)
                .delete('/order/complete/1')
                .expect(200)
                .end(function (err, res) {
                    if (err) return err;
                    var cartProducts = res.body.data.products;
                    cartProducts.should.be.empty();

                });
        });

    });
    
});