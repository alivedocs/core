export class SectionTag implements ITagType {
  options: any = {};
  process(
    liveDocs: IAliveDocs,
    sourceCode: ISourceCode,
    tagToken: ITagPatternParser
  ): void {
    console.log(liveDocs);
    console.log(sourceCode);
    console.log(tagToken);
  }
}
