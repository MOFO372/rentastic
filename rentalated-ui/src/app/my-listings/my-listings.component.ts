import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  apartments: Apartment[]; 
  error: string; 
  selectedApartment: Apartment; 

  
  constructor(private data: ApartmentDataService) { }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment; 
  }

  hideDetails() {
    this.selectedApartment = null; 
  }

  ngOnInit() {
    this.data 
      .getYourListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load apartment data.'
      );
  }


}
