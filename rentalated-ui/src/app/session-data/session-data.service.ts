import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do'; 

@Injectable()
export class SessionDataService {

  baseUrl= 'http://localhost:4567/api/sessions';
  options = { withCredentials: true}; 

  userChanged: Subject<User>;
  currentUser: User;

  constructor(private http: Http) {
    this.userChanged = new Subject<User>();
   }

   getCurrentUser(): User {
     return this.currentUser; 
   }

  login(email: string, password: string): Observable<User> {
    const payload = { email, password }; 
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

  logout(): Observable<User> {
    return this.http
      .delete(`${this.baseUrl}/mine`, { withCredentials: true})
      .map(response => null) //TODO: come back and finish the failure
      .do(user => this.userChanged.next(user))
      .do(() => this.currentUser=null);
    }

}
