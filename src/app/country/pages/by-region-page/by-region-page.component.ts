import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countries(): import("../../interfaces/rest-countries.interface").RESTCountry[] {
    throw new Error('Method not implemented.');
  }
}
