export class Query {
  q:string;
  queryables:Map<string,string> = new Map<string,string>();

  constructor(q:string) {
    this.q = q;
  }

  public toString = () : string => {
    let result = `Query: q='${this.q}'`;
    result += ", queryables="+JSON.stringify(this.queryables);
    return result;
  }
}
