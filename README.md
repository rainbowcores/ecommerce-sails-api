# ecommerce-sails-api

a [Sails v1](https://sailsjs.com) E-Commerce API application


# How To Run Locally

- Clone the project

- Navigate to project folder and run `npm install`

- Create a two databases - one for app data; one for test data
 
- Copy the `local.example.js` file in config folder to `local.js` and replace the url values with your database connection values and the jwtsecret 

- run `sails lift` to serve the project 

- run `npm run test` to run the tests

- Test the app routes via https://www.getpostman.com/collections/e08f588ab01691458d82
