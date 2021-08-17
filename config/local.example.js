/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

module.exports = {

  // Any configuration settings may be overridden below, whether it's built-in Sails
  // options or custom configuration specifically for your app (e.g. Stripe, Sendgrid, etc.)
  datastores: {
    default: {
      url: 'mysql://root:root@localhost:3306/ecommerce-sails-api',
    },
    test: {
      url: 'mysql://root:root@localhost:3306/ecommerce-sails-api-test',
    }
  },
  jwtSecret:"secretkey"
};
