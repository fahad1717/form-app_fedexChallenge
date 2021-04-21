/**
 * User interface definition
 */
 export interface UserModel {
 /**
  * First name of the user
  */
  firstName: string;
 /**
  * Last name of the user
  */
  lastName: string;
 /**
  * Email Address of the user
  */
  email: string;
  /**
   * Password of the user
   */
  password?: string;
}
