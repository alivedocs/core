import { SourceCode } from '../../../core/SourceCode';
import { TagPatternParser } from '../../../core/TagPatternParser';
import { TagType } from '../../../core/TagType';

export class SectionTag extends TagType {
  process(liveDocs: IAliveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void {
    // console.log(liveDocs);
    // console.log(sourceCode);
    // console.log(tagToken);
  }
}
