import { LiveDocs } from '..';
import { SourceCode } from '../core/SourceCode';
import { TagPatternParser } from '../core/TagPatternParser';
import { TagType } from '../core/TagType';

export class OptionTag extends TagType {
  process(liveDocs: LiveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void {
    // console.log(liveDocs);
    // console.log(sourceCode);
    // console.log(tagToken);
  }
}