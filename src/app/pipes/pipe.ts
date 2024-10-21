import { Pipe, PipeTransform } from "@angular/core";


@Pipe({standalone: true, name: "replaceSubstring"})
export class ReplaceSubstring implements PipeTransform {
  transform(str: string, substring: string, replacement: string): string {
    return str.replace(new RegExp(substring,"g"), replacement);
  }
}
