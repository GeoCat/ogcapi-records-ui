import { Component } from '@angular/core';
import {Catalog} from "../../model/catalog";
import {LandingPageService} from "../../services/landing-page.service";
import {Observable} from "rxjs";
import {CollectionsService} from "../../services/collections.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {JsonPipe, NgIf} from "@angular/common";
import {CatalogFullComponent} from "../catalog-full/catalog-full.component";

@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    RouterLink,
    CatalogFullComponent
  ],
  templateUrl: './collection-page.component.html',
  styleUrl: './collection-page.component.scss'
})
export class CollectionPageComponent {

  catalog: Catalog | null = null;

  load(collectionId:string|null) {
    if (collectionId == null) {
      return;
    }
    this.collectionsService.getCollectionJson(collectionId).subscribe(data=>{
      this.catalog = data as Catalog;
    });
  }


  constructor(private collectionsService: CollectionsService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.load(params.get("collectionId"));
    });
  }
}
