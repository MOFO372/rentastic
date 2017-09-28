import { Component, OnInit, Input } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Input()
  apartment: Apartment; 
  message: string; 

  constructor(private data: ApartmentDataService) { }

  activateApartment() { 
    this.data 
      .activate(this.apartment)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
         apartment => {
              this.apartment.is_active = true;
          }
      );
  }

  deactivateApartment() { 
    this.data 
      .deactivate(this.apartment)
      .subscribe( //you have to subscribe to the event in order to make HTTP calls
         apartment => {
            this.apartment.is_active = false;
          }
      );
  }

  // likeApartment() { 
  //   this.data 
  //     .like(this.apartment)
  //     .subscribe( //you have to subscribe to the event in order to make HTTP calls
  //        user => {
  //           if (user) {
  //             this.message = 'Apartment activated, yo.';
  //           } else {
  //             this.message = 'Nah bitch.';
  //           }
  //         },
  //         e => this.message = 'RUH ROH! ' + e
  //     );
  // }


  ngOnInit() {
  }

}
