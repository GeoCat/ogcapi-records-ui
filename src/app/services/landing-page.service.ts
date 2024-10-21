import { Injectable } from '@angular/core';
import {OgcApiUrlProvider} from "./ogcapi-url-provider.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {


  getLandingPageJson() {
    let url = this.landingPageUrlProvider.landingPageUrl;
    return this.httpClient.get(url);
  }

  constructor(private landingPageUrlProvider: OgcApiUrlProvider,
              private httpClient: HttpClient) {  }
}
