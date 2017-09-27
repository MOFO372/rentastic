import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data/session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;
  private message: string; 

  constructor(private data: SessionDataService, private router: Router) { }

  submitLogin() {
    this.data 
      .login(this.email, this.password)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
          user => {
            if (user) {
              this.router.navigate(['/apartments/mine']); //the array acts as a path builder
            } else {
              this.message = 'You did not log in, shitbag.'
            }
          },
          e => this.message = 'RUH ROH! ' + e
      );
  }

  ngOnInit() {
  }

}
