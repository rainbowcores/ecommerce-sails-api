/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    "GET /": "home/index",
    "POST /user/register": "user/register",
    "POST /user/login": "user/login",
    "POST /cart": 'CartsController.addToCart',
    "POST /cart/update/:userid": 'CartsController.updateCart',
    "DELETE /cart/clear/:userid": 'CartsController.clearCart',
    "POST /order": 'OrdersController.placeOrder',
    "POST /order/complete/:orderid": 'OrdersController.completeOrder'
};
