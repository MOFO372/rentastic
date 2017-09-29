import { Component, OnInit, Input } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { User } from '../user';
import { SessionDataService } from '../session-data/session-data.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Input()
  apartment: Apartment;
  message: string;
  currentUser = new User();

  constructor(private data: ApartmentDataService, private service: SessionDataService) { }

  getCurrentUser() {
    return this.currentUser = this.service.getCurrentUser();
  }

  get userIsOwner() {
    return this.getCurrentUser() && this.getCurrentUser().id === this.apartment.user_id;
  }

  activateApartment(apartment) {
    this.data
      .activate(this.apartment)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
      apartment => {
        this.apartment.is_active = true;
      }
      );
  }

  deactivateApartment(apartment) {
    this.data
      .deactivate(this.apartment)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
      apartment => {
        this.apartment.is_active = false;
      }
      );
  }

  likeApartment(currentUser) {
    this.data
      .like(this.apartment)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
      apartment => {
        console.log('likeeeeee woahhhhhh');
      }

      );
  }

  ngOnInit() {
  }

}
