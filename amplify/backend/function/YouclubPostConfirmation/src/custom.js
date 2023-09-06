/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  const axios = require('axios');
  const userEmail = event.request.userAttributes.email;
  const userPassword = event.request.userAttributes.password;

  console.log("HEEEEEY LAMBDA FUNCTION")
  console.log(event)
  console.log(userEmail, '<-- USER EMAIL')
  console.log(userPassword, '<-- USER PASSWORD')
  // 1. Check if user exist
  try {
    const response = await axios.post('https://youclubstaging-42da65c4b5e7.herokuapp.com/graphql', {
      query: `
        userByEmail(email: ${userEmail}) {
          id
          email
          role
        }
      `,
    });
    console.log(response, '<-- RESPOOOOONSE')
    console.log(response?.data?.data?.userByEmail, 'this is data userByEmail')

    // If user exist, return the user
    if (response?.data?.data?.userByEmail) {
      return response?.data?.data?.userByEmail;
    }
    // If user doesn't exist, create a new user
    const newUserResponse = await axios.post('https://youclubstaging-42da65c4b5e7.herokuapp.com/graphql', {
      query: `
        createUser(input: {
          email: ${userEmail},
          password: ${userPassword},
          password_confirmation: ${userPassword},
          role: 'user'
        }) {
          id
          email
          subId
          role
        }
      `,
    });
    return newUserResponse?.data?.data?.createUser;
  } catch (error) {
    console.error(error);
  }
};
