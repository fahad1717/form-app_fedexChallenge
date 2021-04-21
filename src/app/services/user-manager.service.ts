import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

/**
 * User Manager Service class
 */
export class UserManagerService {

  /**
   * Constructor method
   */
  constructor() { }

  /**
   * Angular form array containing form controls/groups
   */
  usersCtrls = new FormArray([]);

  /**
   * Regex for validating password string
   */
  passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

  /**
   * Regex for validating email address string
   */
  emailPattern = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

  /**
   * Create form group containing form controls
   * for the list of user properties
   */
  createUserCtrls() {
    const group = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern), this.checkPwdForName])
    });

    this.usersCtrls.push(group);
    return this.usersCtrls;
  }

  /**
   * function for checking is password contains user's firt or last name
   * @param control angular forms abstract control
   */
  checkPwdForName(control: AbstractControl): { [key: string]: boolean } | null {
    let firstName: any;
    let lastName: any;
    let password: any;

    if(control.parent) {
      firstName = control.parent.controls['firstName'].value;
      lastName = control.parent.controls['lastName'].value;
      password = control.parent.controls['password'].value;

      if(password.toLowerCase().includes(firstName.toLowerCase()) || password.toLowerCase().includes(lastName.toLowerCase())) {
        return {'pwdNameError': true}
      }
    }

    return null;
  }
}
