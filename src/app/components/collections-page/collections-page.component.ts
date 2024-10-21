import { Component } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Observable} from "rxjs";
import {Catalog} from "../../model/catalog";
import {CollectionsService} from "../../services/collections.service";
import {JsonPipe, NgIf} from "@angular/common";
import {Link} from "../../model/contact";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.scss'
})
export class CollectionsPageComponent {

  data:any;

  constructor(private landingPageService: CollectionsService) {
    let collectionsPageJSON:Observable<any> = this.landingPageService.getCollectionsJson();
    collectionsPageJSON.subscribe(data => {

      this.data = data;
     // this.catalog = catalog as Catalog;
    });
  }

  getIcon(c: Catalog) :string|null {
    const iconLink: Link | undefined =
      c.links.find((l) => {
        return l.rel == "icon";
      });
    if (!iconLink) {
      return null;
    }
    return iconLink.href;
  }
}
