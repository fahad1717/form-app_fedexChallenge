import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})

/**
 * User CRUD operations Service class
 */
export class UserCrudService {

  /**
   * Constructor method
   * @param httpClient Angular's service for performing HTTP requests
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * private variable holding the posting url
   */
  private baseUrl = "https://demo-api.vercel.app/users";

  /**
   * Error message string
   */
  errorString: string;

  /**
   * function for executing post request
   */
  public postData(data: UserModel) {
    return this.httpClient.post(this.baseUrl, data).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  /**
   * function for handling HTTP request errors
   */
  errorHandler(error: any) {
    this.errorString = error && error.error && error.error.message || 'Error not known';
    return throwError(this.errorString);
  }
}
