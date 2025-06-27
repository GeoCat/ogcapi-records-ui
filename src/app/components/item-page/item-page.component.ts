import {Component} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {KeywordToImageComponent} from "../shared/keyword-to-image/keyword-to-image.component";
import {ImageInfo, ImageType} from "../../model/ImageInfo";
import {KeywordsComponent} from "../shared/keywords/keywords.component";
import {GnImageComponent} from "../shared/gn-image/gn-image.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [
    NgIf,
    KeywordToImageComponent,
    KeywordsComponent,
    GnImageComponent,
    FaIconComponent
  ],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.scss'
})
export class ItemPageComponent {

  record:any;

  collectionId:string|null="";
  itemId:string|null="";


  recordTypeToImageMap:Map<string, ImageInfo> = new Map<string, ImageInfo>(
    [
        ["service",new ImageInfo(ImageType.FontAwesome, "cloud")],
        ["dataset",new ImageInfo(ImageType.FontAwesome, "database")]

    ]
  );
  recordTypeDefault = new ImageInfo(ImageType.FontAwesome, "circle-question");

  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.collectionId = params.get("collectionId");
      this.itemId = params.get("itemId");
      let obs = this.searchService.getById(this.collectionId, this.itemId);
      if (obs != null) {
        obs.subscribe(data=>{
          this.record= data;
        });
      }
    });

  }

  getFirstSentence(description: string) {
    var result= description.split(/[.!]/)[0];
    if (result.length == description.length) {
      return description;
    }
    return description.substring(0,result.length+1);
  }

  getOtherSentences(description: string) {
    var result= description.split(/[.!]/)[0];
    if (result.length == description.length) {
      return null;
    }
    return description.substring(result.length+1);
  }

  protected readonly faCalendar = faCalendarAlt;
  protected readonly faLongArrowRight = faLongArrowRight;


  isoDateTime2Date(dateTime:string|null) {
    if (dateTime==null) {
      return null;
    }
    if (dateTime.indexOf("T") >0) {
      return dateTime.substring(0,dateTime.indexOf("T"));
    }
    return dateTime;
  }

  getLinks() {
    let alts = this.record.links.filter( (link:any) => link.rel === "alternative");
    let result = new Map();
    alts.forEach( (alt:any) => {
      if (!result.get(alt.type)) {
        result.set(alt.type, []);
      }
      let profiles = result.get(alt.type);
      console.log(profiles);
      if (alt.profile)
        profiles.push({"href":alt.href, "profile":alt.profile[0]});
      else
        profiles.push({"href":alt.href, "profile":"default"});
    })
    return result;
  }

}
