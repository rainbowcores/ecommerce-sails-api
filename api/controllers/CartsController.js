/**
 * CartsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    addToCart: async function (req, res) {
        try {
            //Verify user exists
            const user = await User.findOne({
                id: req.body.userid
            });
            if (!user) {
                res.status(404);
                res.json({
                    message: 'User Not Found'
                });
                return res;
            }

            //Find or create new cart for user
            var newOrExistingCart = await Cart.findOrCreate({ userid: req.body.userid }, { userid: req.body.userid });

            // Check if products exist
            // Add products- cart association
            req.body.products.forEach(async function (factor, index) {
                try {
                    var product = await Product.findOne(factor.productid);
                    if (!product) {
                        res.status(404);
                        res.json({
                            message: 'Product Does Not Exist'
                        });
                        return res;
                    }
                    else if (factor.quantity > product.quantity) {
                        res.status(400);
                        res.json({
                            message: 'Product Quantity In Cart Cannot Be Greater Than Total Product Quantity '
                        });
                    }
                    else if (factor.quantity < 1) {
                        res.status(400);
                        res.json({
                            message: 'Minimum Product Quantity Allowed In Cart Is 1'
                        });
                    }
                    var newOrExistingProductcart = await Productcart.findOrCreate({ product: factor.productid, cart: newOrExistingCart.cart },
                        { product: factor.productid, cart: newOrExistingCart.id, quantity: factor.quantity });
                    newOrExistingProductcart = await Productcart.updateOne({ id: newOrExistingProductcart.id }).set(
                        { product: factor.productid, cart: newOrExistingCart.id, quantity: factor.quantity }).fetch();
                    if (req.body.products.length == index + 1) {
                        var cart = await Productcart.find({ cart: newOrExistingCart.id }).populate('product');
                        var userCartItems = {'user': user, 'cart': newOrExistingCart, "products": cart};
                        return res.json({
                            message: 'Products Added to Cart Successfully',
                            data: userCartItems
                        });
                    }

                } catch (error) {
                    return res.json({
                        message: error.message
                    });
                }

            });

        }
        catch (error) {
            return res.json({
                message: error.message
            });
        }

    },
    updateCart: async function (req, res) {
        var cart;
        try {
            //Verify user exists
            const user = await User.findOne({
                id: req.param('userid')
            });
            
            if (!user) {
                res.status(404);
                res.json({
                    message: 'User Not Found'
                });
                return res;
            }

            //Find  cart for user
            cart = await Cart.findOne({ userid: user.id });
            
            //remove existing product - cart association 
            await Productcart.destroy({ cart: cart.id });

            // Check if products exist
            // Add products- cart association
            req.body.products.forEach(async function (factor, index) {
                cart=this.cart;
                try {
                    var product = await Product.findOne(factor.productid);
                    
                    if (!product) {
                        res.status(404);
                        res.json({
                            message: 'Product Does Not Exist'
                        });
                        return res;
                    }
                    else if (factor.quantity > product.quantity) {
                        res.status(400);
                        res.json({
                            message: 'Product Quantity In Cart Cannot Be Greater Than Total Product Quantity '
                        });
                    }
                    else if (factor.quantity < 1) {
                        res.status(400);
                        res.json({
                            message: 'Minimum Product Quantity Allowed In Cart Is 1'
                        });
                    }
                    await Productcart.create({ product: factor.productid, cart: cart.id, quantity: factor.quantity }).fetch();
                    
                    if (req.body.products.length == index + 1) {
                        // var cart = await Cart.find({ id: newOrExistingCart.id }).populate('productcartid').populate('userid');
                        var userCart = await Productcart.find({ cart: cart.id }).populate('product');
                        var userCartItems = {'user': user, 'cart': cart, "products": userCart};
                        return res.json({
                            message: 'Cart Modified Successfully',
                            data: userCartItems
                        });
                    }

                } catch (error) {
                    return res.json({
                        message: error.message
                    });
                }

            },{cart: cart});

        }
        catch (error) {
            return res.json({
                message: error.message
            });
        }

    },
    clearCart: async function (req, res) {
        try {
            var userid=req.param('userid');

            const user = await User.findOne({
                id: userid
            });
            if (!user) {
                res.status(404);
                res.json({
                    message: 'User Not Found'
                });
                return res;
            }
            const cart = await Cart.findOne({
                userid: userid
            });

            if (!cart) {
                res.json({
                    message: 'User Has Not Added Items to Cart Yet'
                });
                return res;
            }

            var del = await Productcart.destroy({ cart: cart.id }).fetch();
            
            var userCart = await Productcart.find({ cart: cart.id }).populate('product');

            var userCartItems = {'user': user, 'cart': cart, "products": userCart};
            return res.json({
                message: 'Cart Cleared Successfully',
                data: userCartItems
            });
            
        } catch (error) {
            return res.json({
                message: error.message
            });
        }

    }


};

