import { Injectable } from '@angular/core';
import {Query} from "../model/query";

@Injectable({
  providedIn: 'root'
})
export class QueryParserService {

  /**
   * parses the search string to make a Query
   *
   * @param queryablesList  list of the queryable parameters
   * @param searchText what the user typed in to search
   */
  parseSearchString(queryablesList:string[], searchText:string):Query  {
    if (!searchText) {
      return new Query("");
    }
    if (searchText.indexOf(':') == -1) {
      return new Query(searchText); // no queryables
    }

    //parse queryables
    return this.parseWithQueryables(queryablesList,searchText);
  }

  /**
   *
   * This looks for things like:
   *
   *   queryable:<word>  and queryable:"<words>"
   *
   *   and put in the Query object as "queryables" (map representing the queryableName=>user search text)
   *
   * @param searchText - text from user
   */
  parseWithQueryables(queryablesList:string[],searchText: string):Query {
    var map = new Map();
    for (let i = 0; i < queryablesList.length; i++) {
       let queryableName=queryablesList[i];
       var match = this.queryableInString(searchText, queryableName);
       if (match != null && match.queryableText !== "") {
          map.set(match.queryableName, match.queryableText);
         searchText= searchText.replace(match.fullText,"");
       }
    }

    let result =  new Query(searchText);
    result.queryables = map;
    return result;
  }

  /**
   *  Looks for a single queryable in the user string.  If not present, return null.
   *
   *  Otherwise return:
   * {
   *     queryableName:string,   // name of the queryable (from arguments)
   *     queryableText: string,  // what the user is searching for (right of ":", excluding quotes if used)
   *     queryableText:string    // full text of what the user typed <queryableName>:<search text, including quote>
   * }
   *
   * example - id:abc
   *        queryableName id
   *        queryableText abc
   *        queryableText id:abc
   *
   * example = title:"dave was here"
   *         queryableName title
   *         queryableText dave was here
   *         queryableText title:"dave was here"
   *
   * @param text  text from user
   * @param queryableName name of the queryable we are looking for
   */
  queryableInString(text:string, queryableName:string)
                  :{queryableName:string, queryableText: string, fullText:string }| null {
    var indx= text.indexOf(queryableName+":");
    if (indx !== -1) {
      let regex = new RegExp(queryableName+":"+"([^ \"]+)"); //simple text
      let match = text.match(regex);
      if (match != null) {
          return {queryableName:queryableName, queryableText: match[1].trim(), fullText:match[0] }
      }
      let regex1 = new RegExp(queryableName+":"+"\"([^\"]+)\""); //quoted text
      let match1 = text.match(regex1);
      if (match1 != null) {
        return {queryableName:queryableName, queryableText: match1[1].trim(), fullText:match1[0] }
      }
    }
    return null;
  }

  constructor() { }
}
