import { gql } from 'apollo-boost';
import { Mentor, User } from '../models/UserModel';

/**
 * @description holds user graphql queries
 */

export interface GetUserVars {
  id: string;
}

export interface UsersData {
  users: User[];
}

export interface MentorsData {
  mentors: Mentor[];
}

export const GET_USER = gql`
  query {
    user(id: $id) {
      id,
      name,
      email
    }
  }
`;

export const LOGGED_IN_USER = gql`
    query{
      me{
        id,
        email,
        firstName,
        lastName,
        isMentor
      }
    }
`

export const GET_USERS = gql`
    query {
      users{
        id
        email
        firstName
        lastName
        address
        bio
        occupation
        expertise
        isActive
        isMentor
        isStaff
      }
    }
`;

export const GET_ALL_MENTORS = gql`
    query {
      mentors {
        id
        email
        firstName
        lastName
        address
        bio
        occupation
        expertise
        isActive
        isMentor
        isStaff
      }
    }
`

export const GET_ALL_REQUESTS = gql`
    query {
      mentorRequests {
        id
        mentorId
        menteeId
        question
        status
     }
    }
`

export const CHANGE_USER_TO_MENTOR_MUTATION = gql`
  mutation ChangeUserToMentor {
    changeUserToMentor {
      success
    }
  }
`;
