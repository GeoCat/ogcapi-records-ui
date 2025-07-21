import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CollectionsService} from "../../services/collections.service";
import {Observable} from "rxjs";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf, NgFor, JsonPipe, KeyValue} from "@angular/common";
import { KeyValuePipe } from '@angular/common'

@Component({
  selector: 'app-items-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, JsonPipe, RouterLink,KeyValuePipe],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.scss'
})
export class ItemsPageComponent {

  searchText:string ="";
  queryableProperties:string[]=[];
  collectionId:string|null="";
  searchResultGeoJSON:any;
  searchResultGeoJSONALL:any;
  cql:string = "";

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

  search(first:boolean) {
    let query = this.searchService.parseSearchString(this.queryableProperties,this.searchText);
    if (this.cql) {
      query.cql = this.cql;
    }
    let observable= this.searchService.search(query,this.collectionId);
    if (observable !=null) {
      observable.subscribe(data => {
        this.searchResultGeoJSON =data;
        if (first) {
          this.searchResultGeoJSONALL = data;
        }
      });
    }

  }

  ngAfterViewInit() {
    this.search(true);
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

  clickCheckbox(facet: KeyValue<unknown, unknown>, bucket: KeyValue<unknown, { checked:boolean }>) {
    var checked = !bucket.value.checked; // old value, so we flip it
    bucket.value.checked = checked;
    this.setupCQL();
  }

  setupCQL() {
    this.cql = "";

    var first = true;

    var cql = "";
    for (const facetName in this.searchResultGeoJSONALL.facets) {
      var facet = this.searchResultGeoJSONALL.facets[facetName];
      for (var bucketindex = 0; bucketindex < facet.buckets.length; bucketindex++) {
        var bucket = facet.buckets[bucketindex];
        if (bucket.checked) {
          if (!first) {
            cql = cql + " OR "
          }
          cql += "("+facet.property + "= '"+ bucket.value+"')  ";
          first = false;
        }
      }
    }
    this.cql = cql;
    this.search(false);
  }

}
