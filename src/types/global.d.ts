interface IPlugin {
  hooks: any;
}

interface IConfig {
  get<T>(key: string): T;
}

interface IManifest {
  options: any;
  plugins: any;
}

interface ITagItem {}

interface ISourceCode {
  tagItems: ITagItem[];
  sourceLines: string[];
}

interface ITagPatternParser {
  index: number;
  filename: string;
  tagType: string;
  tagValue: string | null;
}

interface ITagType {
  hooks?: any;
  options: {[key: string]: string};
  process(
    liveDocs: IAliveDocs,
    sourceCode: ISourceCode,
    tagToken: ITagPatternParser
  ): void;
}

interface IAliveDocs {
  swapping: any[];
  addTagType(key: string, tagClass: any): void;
}
