import { Injectable } from '@angular/core';
import {OgcApiUrlProvider} from "./ogcapi-url-provider.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {


  getCollectionJson(collectionId:string) {
    let url = this.ogcApiUrlProvider.collectionPageUrl(collectionId);
    return this.httpClient.get(url);
  }

  getCollectionsJson() {
    let url = this.ogcApiUrlProvider.collectionsPageUrl;
    return this.httpClient.get(url);
  }

  constructor(private ogcApiUrlProvider: OgcApiUrlProvider,
              private httpClient: HttpClient) {  }

}
