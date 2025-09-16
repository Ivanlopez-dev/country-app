import { Component, inject, linkedSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent, LoadingSpinnerComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {

      console.log({ query: params.query });

      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query)
    },
  });
}
