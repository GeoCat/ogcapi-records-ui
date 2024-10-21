import {Component, Input} from '@angular/core';
import {LicenseService} from "../../../services/license.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-license',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './license.component.html',
  styleUrl: './license.component.scss'
})
export class LicenseComponent {

  @Input() licenseId?: string|null =null;


  constructor(public LicenseService:LicenseService) {
   }
}
