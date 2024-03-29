/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  const axios = require('axios');
  const userEmail = event.request.userAttributes.email;
  const userSubId = event.request.userAttributes.sub;
  const userPassword = event.request.userAttributes.password;

  console.log(userEmail, '<-- USER EMAIL')
  // 1. Check if user exist
  try {
    const response = await axios.post('https://youclubstaging-42da65c4b5e7.herokuapp.com/graphql', {
      query: `
        query {
          userByEmail(email: "${userEmail}") {
            id
            email
            role
          }
        }
      `,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response, '<-- RESPOOOOONSE')
    console.log(response?.data, '<-- RESPOOOOONSE DATA')
    console.log(response?.data?.data, '<-- RESPOOOOONSE DATA.DATA')
    console.log(response?.data?.data?.userByEmail, '<----- response?.data?.data?.userByEmail')

    // If user exist, return the user
    if (response?.data?.data?.userByEmail) {
      return response.data.data.userByEmail;
    }
    // If user doesn't exist, create a new user
    const newUserResponse = await axios.post('https://youclubstaging-42da65c4b5e7.herokuapp.com/graphql', {
      query: `
        mutation CreateUser {
          createUser(input: {
            email: "${userEmail}",
            password: "12345678",
            passwordConfirmation: "12345678",
            role: "user",
            subId: "${userSubId}"
          }) {
            id
            email
            role
          }
        }
      `,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
  });

    console.log(newUserResponse.data, '<-- NEW USER RESPONSE.data')
    return newUserResponse?.data?.data?.createUser;
  } catch (error) {
    console.error(error);
  }
};
