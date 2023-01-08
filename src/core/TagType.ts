export abstract class TagType {
  // params is always key values of strings.
  // then each Tag parser should convert value 
  // when necessary.
  options: {[key: string]: string} = {};
  abstract process(liveDocs: IAliveDocs, sourceCode: ISourceCode, tagToken: ITagPatternParser): void;
}
