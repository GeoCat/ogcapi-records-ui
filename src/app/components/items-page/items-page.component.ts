import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CollectionsService} from "../../services/collections.service";
import {Observable} from "rxjs";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf, NgFor, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-items-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, JsonPipe, RouterLink],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.scss'
})
export class ItemsPageComponent {

  searchText:string ="";
  queryableProperties:string[]=[];
  collectionId:string|null="";
  searchResultGeoJSON:any;

  featureOverview(feature:any) {
    if (feature.imgError) {
      return null;
    }
    let gn_elastic = feature.properties["gn-elastic-index-record"] as any;
    if (gn_elastic && gn_elastic.overview && gn_elastic.overview.length>0) {
       let overviews = gn_elastic.overview;
       if (overviews[0].data) {
         return overviews[0].data;
       }
       return overviews[0].url;
    }
    return null;
  }

  search() {
    let query = this.searchService.parseSearchString(this.queryableProperties,this.searchText);
    let observable= this.searchService.search(query,this.collectionId);
    if (observable !=null) {
      observable.subscribe(data => {
        this.searchResultGeoJSON =data;
      });
    }

  }


  constructor(private searchService: SearchService,
        private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.collectionId = params.get("collectionId");
      this.getQueryables(this.collectionId);
    });
  }

  private getQueryables(collectionId: string | null) {
    let queryables:Observable<any>|null = this.searchService.getQueryables(collectionId);
    if (queryables != null) {
      queryables.subscribe(data => {
           this.queryableProperties = Object.getOwnPropertyNames(data.properties);
      });
    }
  }
}
