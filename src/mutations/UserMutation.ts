import { gql } from 'apollo-boost';

/**
 * @description holds user graphql mutations
 */

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser(
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String,
    $bio: String,
    $occupation: String,
    $expertise: String,
    $isActive: Boolean,
    $isMentor: Boolean,
    $isStaff: Boolean
  ) {
    registerUser(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      bio: $bio,
      occupation: $occupation,
      expertise: $expertise,
      isActive: $isActive,
      isMentor: $isMentor,
      isStaff: $isStaff
    ) {
      user {
        id
        email
        firstName
        lastName
      }
      token
      refreshToken
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export const REQUEST_SESSION = gql`
  mutation RequestSession($mentorId: Int!, $question:String!) {
    requestSession(mentorId: $mentorId, question: $question) {
      request {
        id
        mentorId
        menteeId
        question
        status
    }
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation AcceptRequest($requestId: Int!) {
    acceptRequest(requestId: $requestId) {
      request {
        id
        mentorId
        menteeId
        question
        status
    }
    }
  }
`;

export const REJECT_REQUEST = gql`
mutation RejectRequest($requestId: Int!) {
  rejectRequest(requestId: $requestId) {
    request {
      id
      mentorId
      menteeId
      question
      status
  }
  }
}
`



export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id,
      name,
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: String!) {
    deleteUser(id: $input) {
      id,
      name,
      email
    }
  }
`;
