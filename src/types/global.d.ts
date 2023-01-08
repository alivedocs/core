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

interface ISourceCode {}
interface ITagPatternParser {}

interface ITagType {
  process(liveDocs: IAliveDocs, sourceCode: ISourceCode, tagToken: ITagPatternParser): void;
}

interface IAliveDocs {
  swapping: any[]
  addTagType(key: string, tagClass: any): void
}
