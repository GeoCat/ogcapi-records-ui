import { Component } from '@angular/core';
import {OgcApiUrlProvider} from "../../services/ogcapi-url-provider.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected baseUrl: string;
  protected baseUrlFull: string;


  constructor(private LandingPageService: OgcApiUrlProvider) {
    this.baseUrlFull = this.LandingPageService.landingPageUrl;
    this.baseUrl = this.LandingPageService.landingPageUrl;
    this.baseUrl = this.baseUrl.replace("http://","");
    this.baseUrl = this.baseUrl.replace("https://","");
    this.baseUrl = this.baseUrl.replace(/\?.+/,"");
  }
}
