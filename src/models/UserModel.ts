/**
 * @description holds user model
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  bio: string;
  occupation: string;
  expertise: string;
  isMentor: boolean;
  isStaff: boolean;
}

export interface Mentor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  bio: string;
  occupation: string;
  expertise: string;
  isMentor: boolean;
  isStaff: boolean;
}
