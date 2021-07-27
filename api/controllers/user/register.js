module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New ecommerce user registered',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address exists',
    },
    error: {
      description: 'Something went wrong with registration ',
    },

  },


  fn: async function (inputs, exits) {
    const newEmailAddress = inputs.email.toLowerCase();
    let newUser ;
    try {
      newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
      }).fetch();
    }
    catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exists',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred with registration',
        error: error.message,
      });
    }
    // All done.
    return exits.success({
      message: `An account has been created for ${newUser.email} successfully`,
    });

  }


};
