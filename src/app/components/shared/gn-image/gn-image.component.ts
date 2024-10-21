import {Component, Input} from '@angular/core';
import {GnImage} from "../../../model/ImageInfo";

/**
 * The GN Elastic JSON has a format for images;
 *
 *   {
 *        url:string   //SRC=url
 *        data:string  //SRC="data:..."
 *        text:string //text for the image (note - not usually present)
 *   }
 *
 *   We prefer url to data, because data isn't always correct (reduced size).
 */
@Component({
  selector: 'app-gn-image',
  standalone: true,
  imports: [],
  templateUrl: './gn-image.component.html',
  styleUrl: './gn-image.component.scss'
})
export class GnImageComponent {

  @Input() gnImage: GnImage|null =null;

  getSrc() {
    if (this.gnImage ==null) {
      return null;
    }
    let hasUrl = this.gnImage.url !=null && this.gnImage.url.length >0;
    if (hasUrl) {
      return this.gnImage.url;
    }
    return this.gnImage.data;
  }

}
