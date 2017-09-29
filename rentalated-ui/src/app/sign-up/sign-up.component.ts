import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  private email: string;
  private password: string;
  private first_name: string;
  private last_name: string; 
  private message: string; 


  constructor(private data: UserDataService, private router: Router) { }



  submitSignup() {
    this.data 
    .signup(this.email, this.password, this.first_name, this.last_name)
    .subscribe( //you have to subscribe to the event in order to make HTTP calls
        user => {
          if (user) {
            this.router.navigate(['/apartments/users/signup']); //the array acts as a path builder
          } else {
            this.message = 'You did not signup, dirt-face.'
          }
        },
        e => this.message = 'RUH ROH! ' + e
    );
  }

  ngOnInit() {
  }

}
