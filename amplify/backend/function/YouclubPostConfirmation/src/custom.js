/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  const axios = require('axios');
  console.log("HEEEEEY LAMBDA FUNCTION")
  console.log(event)
  const response = await axios.post('http://localhost:3000/graphql', {
    query: `
      userByEmail(email: "didikong@depozen.com") {
        id
        email
        subId
      }
    `,
  });

  console.log(response.data.data.userByEmail, 'this is data userByEmail')

  return event;
};

// exports.handler = async (event, context, callback) => {
//   const userEmail = event.request.userAttributes.email;

//   try {
//     // Replace with your Rails API endpoint
//     const apiUrl = 'https://your-rails-api.com/api/users';

//     // Check if the user exists
//     const userResponse = await axios.get(`${apiUrl}?email=${userEmail}`);

//     if (userResponse.data.length === 0) {
//       // If the user doesn't exist, create a new user
//       const newUserResponse = await axios.post(apiUrl, {
//         user: {
//           email: userEmail,
//           // Add any other user attributes you need
//         },
//       });

//       console.log('User created:', newUserResponse.data);
//     } else {
//       console.log('User already exists:', userResponse.data);
//     }
//   } catch (error) {
//     console.error('Error interacting with Rails API:', error);
//   }

//   // Continue with the default Post Confirmation Lambda function logic
// };
