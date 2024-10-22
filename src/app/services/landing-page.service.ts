import { Injectable } from '@angular/core';
import {OgcApiUrlProvider} from "./ogcapi-url-provider.service";
import {HttpClient} from "@angular/common/http";

/**
 * Very simple service for the landing page.
 *
 * Get the landing page json, which has links and, if configured, metadata about the server.
 *
 * NOTE: server metadata is gn-specific.
 */
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
