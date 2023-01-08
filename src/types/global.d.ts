interface IPlugin {
  hooks: any;
}

interface ISourceCode {}
interface ITagPatternParser {}

interface ITagType {
  process(liveDocs: IAliveDocs, sourceCode: ISourceCode, tagToken: ITagPatternParser): void;
}

interface IAliveDocs {
  swapping: any[]
  addTagType(key: string, tagClass: any): void
}
