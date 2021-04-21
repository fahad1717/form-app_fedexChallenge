import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UserModel } from './models/user';
import { UserManagerService } from './services/user-manager.service';
import { UserCrudService } from './services/user-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * App Component Class
 */
export class AppComponent implements OnInit {

  /**
   * Constructor method
   * @param userService user manager service
   * @param userCrudService user CRUD operations service
   */
  constructor(private userService: UserManagerService, private userCrudService: UserCrudService){}

  /**
   * Angular form array containing form controls/groups
   */
  usersForm = new FormArray([]);

  /**
   * Angular form group containing form controls
   */
  userFormGroup: FormGroup;

  /**
   * User Model definition
   */
  user: UserModel;

  /**
   * Angular's initialize lifecycle hook
   */
  ngOnInit() {
    this.usersForm = this.userService.createUserCtrls();
    let groupCtrls = this.usersForm['controls'];
    this.userFormGroup = groupCtrls[0] as FormGroup;
    this.userFormGroup.valueChanges.subscribe((val: UserModel) => {
      this.user = {
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email
      }
    });
  }

  /**
   * function for posting user data
   */
  submitForm() {
    this.userCrudService.postData(this.user).subscribe((data: any) => {
      console.log(data, "data posted");
    });
  }
}
