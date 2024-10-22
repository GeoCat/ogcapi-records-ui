import { Injectable } from '@angular/core';
import {OgcApiUrlProvider} from "./ogcapi-url-provider.service";
import {HttpClient} from "@angular/common/http";
import {Query} from "../model/query";
import {QueryParserService} from "./query-parser.service";


/**
 * performs the search and request the queryables JSON.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  /**
   * converts user text search string to a Query.
   *
   * @param queryablesList list of configured queryables
   * @param searchText what user typed in
   */
  parseSearchString(queryablesList:string[],searchText:string):Query {
   return this.queryParser.parseSearchString(queryablesList,searchText);
  }

  /**
   * Get a single item (record) from a collection
   *
   * @param collectionId what collection
   * @param itemId what record yuid
   */
  getById(collectionId:string|null,itemId:string|null) {
    if (collectionId == null || itemId ==null) {
      return null;
    }
    let url = this.ogcApiUrlProvider.itemUrl(collectionId,itemId);
    return this.httpClient.get(url);
  }

  /**
   * perform ogcapi records search.
   *
   * @param query search parameters
   * @param collectionId what collection to search in
   */
  search(query:Query,collectionId:string|null){
    if (collectionId == null) {
      return null;
    }
    let url = this.ogcApiUrlProvider.itemsUrl(collectionId);
    url += "&q="+encodeURI(query.q.trim());
    for (const [key, value] of query.queryables.entries()) {
        url += "&"+key+"="+encodeURIComponent(value);
    }
    return this.httpClient.get(url);
  }


  /**
   * get the queryables for this collection
   *    /collections/<collectionId>/queryables
   *
   * @param collectionId which collection
   */
  getQueryables(collectionId:string|null)  {
    if (collectionId == null) {
      return null;
    }
    let url = this.ogcApiUrlProvider.queryablesUrl(collectionId);
    return this.httpClient.get(url);
  }




  constructor(private ogcApiUrlProvider: OgcApiUrlProvider,
              private queryParser: QueryParserService,
              private httpClient: HttpClient) {
  }
}
