import {Catalog} from "./catalog";
import {Link} from "./contact";

/**
 * This from the ogcapi-records collections definition.
 */
export interface Collections {

  links: Link[];
  collections:Catalog[];

}
