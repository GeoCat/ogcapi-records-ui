/**
 * taken from ogcapi specification - see catalog.yaml and, specifically, contact.yaml
 *
 *  also see GN Microservices ogcapi-records
 */


export interface Link {
  rel?: string ;
  type?: string ;
  hreflang?: string ;
  title?: string ;
  length?: number ;
  created?: string;
  updated?: string ;
  href: string;
}


export interface Phone {
  value: string;
  roles: string[] |null;
}


export interface Email {
  value: string;
  roles: string |null[];
}

export interface Address {
  deliveryPoint: string[] |null;
  city: string |null;
  administrativeArea: string |null;
  postalCode: string |null;
  country: string |null;
  roles: string[] |null;
}

export interface Contact {
  identifier: string |null;
  name:string |null;
  position:string |null;
  organization:string |null;
  logo: Link |null;
  phones: Phone[] |null;
  emails: Email[] |null;
  addresses: Address[] |null;
  links: Link[] |null;
  hoursOfService:string |null;
  contactInstructions: string |null;
  roles: string[] |null;
}
