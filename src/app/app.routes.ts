import { Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {CollectionsPageComponent} from "./components/collections-page/collections-page.component";
import {CollectionPageComponent} from "./components/collection-page/collection-page.component";
import {ItemsPageComponent} from "./components/items-page/items-page.component";
import {ItemPageComponent} from "./components/item-page/item-page.component";

export const routes: Routes = [
  {path: 'landingpage', component:LandingPageComponent},
  {path: 'collections', component:CollectionsPageComponent},
  {path: 'collections/:collectionId', component:CollectionPageComponent},
  {path: 'collections/:collectionId/items', component:ItemsPageComponent},
  {path: 'collections/:collectionId/items/:itemId', component:ItemPageComponent},

  { path: '',   redirectTo: '/landingpage', pathMatch: 'full' },
];
