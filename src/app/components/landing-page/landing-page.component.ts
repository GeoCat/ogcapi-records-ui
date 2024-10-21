import { Component } from '@angular/core';
import {LandingPageService} from "../../services/landing-page.service";
import {Observable} from "rxjs";
import {KeywordsComponent} from "../shared/keywords/keywords.component";
import {ContactComponent} from "../shared/contact/contact.component";
import {Contact} from "../../model/contact";
import {LicenseComponent} from "../shared/license/license.component";
import {RouterLink} from "@angular/router";
import {CatalogFullComponent} from "../catalog-full/catalog-full.component";
import {Catalog} from "../../model/catalog";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    KeywordsComponent,
    ContactComponent,
    LicenseComponent,
    RouterLink,
    CatalogFullComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {


  catalog: Catalog | null = null;


  constructor(private landingPageService: LandingPageService) {
    let landingPageJson:Observable<any> = this.landingPageService.getLandingPageJson();
    landingPageJson.subscribe(data => {
          let catalog = {};
          if (!data.systemInfo) {
            //create bare minimum catalog object
            catalog = {title:data.title, description:data.description, links:data.links};
          }
          else {
            catalog = data.systemInfo;
          }
          this.catalog = catalog as Catalog;
        });
  }
}
