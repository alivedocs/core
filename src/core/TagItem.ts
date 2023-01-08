export class TagItem {
  type: string;
  context: any = {}

  constructor(tagType: string, sourceCode: ISourceCode, context: any) {
    this.type = tagType
    this.context = context;
  }
}
