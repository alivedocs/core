import { SourceCode } from "./SourceCode";

export class TagItem {
  type: string;
  context: any = {}

  constructor(tagType: string, sourceCode: SourceCode, context: any) {
    this.type = tagType
    this.context = context;
  }
}
