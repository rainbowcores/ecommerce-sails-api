/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    placeOrder: async function (req, res) {
        try {
            //Verify user exists
            var user = await User.findOne({
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
            var newOrder = await Order.create({ userid: req.body.userid, status: req.body.status}).fetch();

            // Check if products exist
            // Add products- cart association
            req.body.products.forEach(async function (factor, index) {
                newOrder=this.newOrder;
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
                    await ProductOrder.create(
                        { product: factor.productid, order: newOrder.id, quantity: factor.quantity });
                    if (req.body.products.length == index + 1) {
                        var order = await ProductOrder.find({ order: newOrder.id}).populate('product');
                        var userOrderItems = {'user': user, 'order': newOrder, "products": order};
                        return res.json({
                            message: 'Order Created Successfully',
                            data: userOrderItems
                        });
                    }

                } catch (error) {
                    return res.json({
                        message: error.message
                    });
                }

            },{newOrder: newOrder});

        }
        catch (error) {
            return res.json({
                message: error.message
            });
        }

    },
    completeOrder: async function (req, res) {
        try {
            //Verify order exists
            var order = await Order.findOne({
                id: req.param('orderid')
            });
            if (!order) {
                res.status(404);
                res.json({
                    message: 'Order Not Found'
                });
                return res;
            }
            var user = await User.findOne({
                id: req.param('userid')
            });
            
            if (!user) {
                res.status(404);
                res.json({
                    message: 'User Not Found'
                });
                return res;
            }
            // Check if products exist
            // Add products- cart association
            req.body.products.forEach(async function (factor, index) {
                order=this.order;
                user=this.user;
                try {
                    var product = await Product.findOne({id:factor.productid});
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
                    var newProductQuantity = product.quantity - factor.quantity;
                    var product = await Product.update({id:factor.productid})
                    .set({
                        quantity:newProductQuantity
                    });
                    
                    if (req.body.products.length == index + 1) {
                        order.status = req.body.status;
                        var productOrder = await ProductOrder.find({ order: order.id}).populate('product');
                        var userOrderItems = {'user': user, 'order': order, "products": productOrder};
                        return res.json({
                            message: 'Order Completed Successfully',
                            data: userOrderItems
                        });
                    }


                } catch (error) {
                    return res.json({
                        message: error.message
                    });
                }

            },{order: order, user:user});


        }
        catch (error) {
            return res.json({
                message: error.message
            });
        }

    },
};

