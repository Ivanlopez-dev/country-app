import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { CountryListComponent } from "../../components/country-list/country-list.component";

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Europe';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {

      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
        }
      })

      return this.countryService.searchByRegion(params.region)
    },
  });
}
