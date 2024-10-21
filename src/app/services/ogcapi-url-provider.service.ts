import {Injectable} from '@angular/core';

/**
 * This provides the location of the standard ogcapi pages like;
 *    landing page ("/")
 *    collections page ("/collections")
 *    ...
 *
 */
@Injectable({
  providedIn: 'root'
})
export class OgcApiUrlProvider {

  private _landingPageUrl : string;
  private _collectionsPageUrl : string;



  itemUrl(collectionId:string, itemId:string): string {
    return this.collectionPageUrl(collectionId)+"/items/"+encodeURI(itemId)+"?f=geojson";
  }

  itemsUrl(collectionId:string): string {
    return this.collectionPageUrl(collectionId)+"/items?f=geojson";
  }

  queryablesUrl(collectionId:string): string {
    return this.collectionPageUrl(collectionId)+"/queryables?f=json";
  }

  collectionPageUrl(collectionId:string): string {
    return this.simplifyUrl(this._collectionsPageUrl) +"/"+encodeURI(collectionId);
  }

  get collectionsPageUrl(): string {
    return this._collectionsPageUrl;
  }

  get landingPageUrl(): string {
    return this._landingPageUrl;
  }

  private simplifyUrl(url: string): string {
    return url.replace(/\?.*/, "");
  }

  constructor() {
    this._landingPageUrl = "http://localhost:9999?f=json";
    //this should be generated from the landing page's JSON (links section).
    this._collectionsPageUrl = this.simplifyUrl(this.landingPageUrl)+"/collections?f=json";
  }
}
