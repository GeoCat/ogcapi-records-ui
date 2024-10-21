import {Component, Input} from '@angular/core';
import {ImageInfo, ImageType} from "../../../model/ImageInfo";
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {NgIf} from "@angular/common";

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';



/**
 * Converts a keyword to an image.
 *
 *  inputs
 *      - dictionary to convert a keyword to an image (see below)
 *      - actual keyword
 *      - what to use if there is no conversion
 *
 *  output
 *      - image to represent the keyword
 *
 * NOTE: only font awesome fonts are supported at the moment.
 * NOTE: you need to explicitly add the fonts you want (there are other ways to make a library)
 *
 * Styling:  set `font-size:` to change size
 *
 */
@Component({
  selector: 'app-keyword-to-image',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgIf
  ],
  templateUrl: './keyword-to-image.component.html',
  styleUrl: './keyword-to-image.component.scss'
})
export class KeywordToImageComponent {

  @Input() translationMap: Map<string, ImageInfo> = new Map();
  @Input() keyword: string="";
  @Input() default: ImageInfo|null= null;

  translation():ImageInfo{
    if (this.translationMap.has(this.keyword)) {
      return <ImageInfo>this.translationMap.get(this.keyword);
    }
    return <ImageInfo>this.default;
  }

  protected readonly ImageType = ImageType;


  constructor(library: FaIconLibrary) {
    library.addIcons(faCoffee,faDatabase,faCloud,faCircleQuestion);

  }

}
