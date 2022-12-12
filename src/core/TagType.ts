import { LiveDocs } from "..";
import { SourceCode } from "./SourceCode";
import { TagPatternParser } from "./TagPatternParser";

export abstract class TagType {
  // params is always key values of strings.
  // then each Tag parser should convert value 
  // when necessary.
  options: {[key: string]: string} = {};
  abstract process(liveDocs: LiveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void;
}
