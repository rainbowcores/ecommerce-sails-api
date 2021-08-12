/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Product = require("../models/Product");

module.exports = {


    exits: {
        success: {
            statusCode: 201,
            description: 'New product created',
        },
        productNameAlreadyInUse: {
            statusCode: 400,
            description: 'Product with same name already exists',
        },
        error: {
            description: 'Something went wrong ',
        },

    },



};

