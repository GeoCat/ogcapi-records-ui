import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {Contact} from "../../model/contact";
import {LandingPageService} from "../../services/landing-page.service";
import {Catalog} from "../../model/catalog";
import {ContactComponent} from "../shared/contact/contact.component";
import {KeywordsComponent} from "../shared/keywords/keywords.component";
import {LicenseComponent} from "../shared/license/license.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-catalog-full',
  standalone: true,
  imports: [
    ContactComponent,
    KeywordsComponent,
    LicenseComponent,
    RouterLink
  ],
  templateUrl: './catalog-full.component.html',
  styleUrl: './catalog-full.component.scss'
})
export class CatalogFullComponent {

  @Input() catalog: Catalog | null = null;


  constructor() {

  };


}
