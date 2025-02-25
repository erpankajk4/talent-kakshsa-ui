import { gql } from "@apollo/client";

export const registerUserQuery = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const loginUserQuery = gql`
  mutation loginUser($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const updateUserQuery = gql`
  mutation updateUserQuery($id: ID!, $input: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $input) {
      data {
        id
        attributes {
          username
          email
          mobileNumber
          otp
        }
      }
    }
  }
`;


// {
//   "input":{
//     "phoneNumber": "8318346886",
//     "otp":"608188"
// }
// }

// {
//   "input": {
//     "name": "Simran",
//     "email": "simran@example.com",
//     "phoneNumber": "8318346886"
//   }
// }

// {
//   "data": {
//     "verifyOTP": {
//       "__typename": "UserProfileEntityResponse",
//       "data": {
//         "id": "11",
//         "attributes": {
//           "name": null,
//           "username": "simran@example.com",
//           "email": "simran@example.com",
//           "phoneNumber": "8318346886",
//           "roles": [
//             "student-default-role"
//           ],
//           "permissions": [],
//           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOlsic3R1ZGVudC1kZWZhdWx0LXJvbGUiXSwicGVybWlzc2lvbiI6W10sImlhdCI6MTcyMTgwNzEyMiwiZXhwIjoxNzI0Mzk5MTIyfQ.7dpFxDR0xDeusCCN0Vo248ood5SeRvz0y6_SSiyHnls"
//         }
//       }
//     }
//   }
// }

// {
//   "data": {
//     "registerUser": {
//       "status": 200,
//       "message": "User registered successfully"
//     }
//   }
// }