import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserManagerService } from './user-manager.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('UserManagerService', () => {
  let service: UserManagerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkPwdForName', ()=> {
    it('should not throw error when password does not contain first or last name', () => {
      const group = new FormGroup({
        firstName: new FormControl('Dante'),
        lastName: new FormControl('Sparda'),
        email: new FormControl('xyz@gmail.com'),
        password: new FormControl('9999aaaAAA')
      });
      service.usersCtrls.push(group);
      service.checkPwdForName(group.get('password'));
      expect(group.get('password').errors).toBeFalsy();
    });
  });
});
