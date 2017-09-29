//module imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

//component imports
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApartmentListingsComponent } from './apartment-listings/apartment-listings.component';

//service imports
import { ApartmentDataService } from './apartment-data/apartment-data.service';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component'; 
import { SessionDataService } from './session-data/session-data.service';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserDataService } from './user-data/user-data.service';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ApartmentListingsComponent },
  { path: 'apartments/mine', component: MyListingsComponent },
  { path: 'apartments/users/signup', component: SignUpComponent },
  { path: 'activations', component: ApartmentDetailComponent},
  { path: 'deactivations', component: ApartmentDetailComponent},
  { path: 'likes', component: ApartmentDetailComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ApartmentListingsComponent,
    ApartmentDetailComponent,
    LoginComponent,
    MyListingsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes), 
    FormsModule
  ],
  providers: [ApartmentDataService,
    SessionDataService,
    UserDataService
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
