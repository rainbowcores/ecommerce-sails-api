var supertest = require('supertest');
var should = require('should');


describe('Cart Functionality ()', function () {

    describe('# Add to Cart()',  function () {
        
        it('should add products to cart given product id and quantity and user id', async function () {
            var user = await User.create({
                fullName: "Christine Wanjiru",
                email: "wanjirugichuki22@gmail.om",
                password: "01234567"
            }).fetch();
            var product = await Product.create({
                productName: "Fantah",
                description: "Orange",
                quantity: 10
            }).fetch();
            supertest(sails.hooks.http.app)
                .post('/cart')
                .send({
                    "userid": user.id,
                    "products": [
                        {
                            "productid": product.id,
                            "quantity": 3
                        }
                    ]

                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productName = res.body.data.products[0].product.productName;
                    should.equal(productName, product.productName);
                });
        });
    });
    describe('# Modify Cart()',  function () {
       
        it('should modify the cart given product id and quantity and user id', async function () {
            var user = await User.create({
                fullName: "Christine Wanjiru",
                email: "wanjirugichuki22@gmail.com",
                password: "01234567"
            }).fetch();
            var product = await Product.create({
                productName: "Fanta",
                description: "Orange",
                quantity: 10
            }).fetch();
            var cart = await Cart.create({
                userid: user.id
            }).fetch();
            supertest(sails.hooks.http.app)
                .post('/cart/update/'+user.id)
                .send({
                    "products": [
                        {
                            "productid": product.id,
                            "quantity": 3
                        }
                    ]
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var productName = res.body.data.products[0].product.productName;
                    should.equal(productName, product.productName);
                });
        });
        
    });
    describe('#Clear Cart()', function(){
        it('should clear cart given user id', async function () {
            var user = await User.create({
                fullName: "Christine Wanjiru",
                email: "wanjirugichuki22@gmail.dom",
                password: "01234567"
            }).fetch();
            var product = await Product.create({
                productName: "MMaid",
                description: "Orange",
                quantity: 10
            }).fetch();
            supertest(sails.hooks.http.app)
                .post('/cart')
                .send({
                    "userid": user.id,
                    "products": [
                        {
                            "productid": product.id,
                            "quantity": 3
                        }
                    ]

                })
                .end(function (err, res) {
                    if (err) return done(err);
                });

            supertest(sails.hooks.http.app)
                .delete('/cart/clear/1')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    var cartProducts = res.body.data.products;
                    cartProducts.should.be.empty();

                });
        });
    })
});