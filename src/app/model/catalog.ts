// taken from ogcapi specification - see catalog.yaml
//also see GN Microservices ogcapi-records CollectionInfo (which is the same as this, and is annotated with
//documentation

import {Contact, Link} from "./contact";

/**
 *
 * This is from the OGCAPI-Records `catalog.yaml` type definition.
 *
 * See the definition in GN-microservices ogcapi-records (CatalogInfo).
 */
export interface Catalog {
  type?: string;      //catalog
  itemType?: string ; //record
  id?: string ;
  title: string ;
  description: string ;
  links: Link[] ;
  extent: Extent ;
  crs?: string[] ;
  contacts?: Contact[] ;
  created?: string ;
  updated?: string ;
  keywords?: string[] ;
  language? : Language;
  themes? : Theme[];
  license?: string ;
  rights?: string ;
  defaultSortOrder?: string[] ;
  conformsTo?: string ;
  recordLanguages?: string[] ;
  recordsArrayName?: string ;
  OgcApiSchema? : any[]; // TODO - define this fully (its a big object hierarchy)

}

interface SpatialExtent {
  bbox:number[];
  crs:string;

}

interface TemporalExtent {
  interval:string[];
  resolution?:string;
  trs?:string;
}

export interface Extent {
  spatial?: SpatialExtent;
  temporal?: TemporalExtent;
}


export interface Language {
  code:string;
  name?:string;
  alternate?:string;
  dir?:string;
}

export interface Theme {
  concepts?:Concept[];
  schema?:string;

}

export interface Concept {
  id?:string;
  title?:string;
  description?:string;
  url?:string;


}



export const CRS84 = "http://www.opengis.net/def/crs/OGC/1.3/CRS84";
export const CRS84h = "http://www.opengis.net/def/crs/OGC/0/CRS84h";
