import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../user';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {

  baseUrl= 'http://localhost:4567/api/users';
  options = { withCredentials: true}; 

  userChanged: Subject<User>;
  currentUser: User;

  constructor(private http: Http) {
    this.userChanged = new Subject<User>();
   }

  signup(email: string, password: string, first_name: string, last_name: string): Observable<User> {
    const payload = { email, password, first_name, last_name }; 
    return this.http 
      .post(this.baseUrl, payload, this.options)
      .map(response => response.json())
      .map(user => {
        if (user.first_name) {
          return user;
        }
        return null;
      })
      .do(user => this.userChanged.next(user))
      .do(user => this.currentUser = user);
  }

}
