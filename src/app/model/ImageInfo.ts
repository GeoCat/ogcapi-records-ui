

export enum ImageType {
  FontAwesome = 'font-awesome',
  // ImageData = 'image-data',
  // ImageHref = 'image-href',
  // Svg = 'svg'
}


export class ImageInfo {

  imageType:ImageType;
  imageData:string; //either a url, data:, or SVG block


  constructor(imageType: ImageType, imageData: string) {
    this.imageType = imageType;
    this.imageData = imageData;
  }
}


/**
 * The GN Elastic JSON has a format for images;
 *
 *   {
 *        url:string   //SRC=url
 *        data:string  //SRC="data:..."
 *        text:string //text for the image (note - not usually present)
 *   }
 */
export interface GnImage {
    url:string|null;
    data:string|null;
    text:string|null;
}