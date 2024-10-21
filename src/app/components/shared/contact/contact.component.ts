import {Component, Input} from '@angular/core';
import {Contact} from "../../../model/contact";
import {NgIf} from "@angular/common";
import {ReplaceSubstring} from "../../../pipes/pipe";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgIf, ReplaceSubstring],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact?: Contact|null = null ;
  @Input() title: string="";

}
