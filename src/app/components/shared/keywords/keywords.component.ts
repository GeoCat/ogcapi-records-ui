import {Component, Input} from '@angular/core';
import { NgFor} from "@angular/common";

@Component({
  selector: 'app-keywords',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './keywords.component.html',
  styleUrl: './keywords.component.scss'
})
export class KeywordsComponent {
  @Input() keywords?: string[] = [];
}
