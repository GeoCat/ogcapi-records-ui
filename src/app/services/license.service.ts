import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Link} from "../model/contact";

/**
 * Simple service for converting the ogcapi license into a more human-readable form.
 *
 * This gets the spdx license list and will find the referenced-in-the-metadata license in that list.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  url= "https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json";

  // allLicenses["0BSD"] = {"name": "BSD Zero Clause License", ...}
  public allLicenses: { [id: string] : License; } = {};


  convert(licenseCode?:string) :Link {
    if (licenseCode == null) {
      return {title: "No License", href: ""};
    }
    var foundLicense= this.allLicenses[licenseCode!];
    if (foundLicense) {
      var url = foundLicense.reference == null ? "" : foundLicense.reference;
      return {title: foundLicense.name, href: url};
    }
    return {title: licenseCode, href: ""};
  }

  constructor( private httpClient: HttpClient) {
    this.httpClient.get(this.url)
      .subscribe( (response:any) => {
          let licenses =  response.licenses as License[];

        for (var i = 0; i < licenses.length; i++)
        {
          var l = licenses[i];
          this.allLicenses[l.licenseId] = l;
        }
      });
  }
}

export interface License {
  reference: string|null;
  isDeprecatedLicenseId: string|null;
  detailsUrl: string|null;
  referenceNumber: number|null;
  name: string;
  licenseId: string;
  seeAlso: string[]|null;
  isOsiApproved: boolean|null;

}
