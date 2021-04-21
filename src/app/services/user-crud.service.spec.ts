import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserCrudService } from './user-crud.service';
import { UserModel } from '../models/user';

describe('UserCrudService', () => {
  let crudService: UserCrudService;
  let httpTestingController: HttpTestingController;
  let user: UserModel;
  let baseUrl = "https://demo-api.vercel.app/users";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    user = {
      firstName: "Virgil",
      lastName: "Sparda",
      email: "xyz@gmail.com",
      password: "kkkkGGG999"
    };
    crudService = TestBed.inject(UserCrudService);
  });

  beforeEach(inject(
    [UserCrudService],
    (service: UserCrudService) => {
      crudService = service;
    }
  ));

  it('should be created', () => {
    expect(crudService).toBeTruthy();
  });

  it('should make a POST reqest to create a new user', () => {
    crudService.postData(user).subscribe();

    let req = httpTestingController.expectOne({ method: "POST", url: baseUrl });
    expect(req.request.body).toEqual(user);
  });

  describe('errorHandler', ()=> {
    it('should handle HTTP request error', () => {
      let error = {
        error: {
          message: "some error"
        },
      };

      crudService.errorHandler(error);
      expect(crudService.errorString).toBe("some error");
    });

    it('should handle unknown errors', () => {
      let error = {};
      crudService.errorHandler(error);
      expect(crudService.errorString).toBe("Error not known");
    });
  });
});
