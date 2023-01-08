import { SourceCode } from '../../../core/SourceCode';
import { TagPatternParser } from '../../../core/TagPatternParser';
import { TagType } from '../../../core/TagType';
import { TagItem } from '../../../core/TagItem';

export class OptionTag extends TagType {
  process(liveDocs: IAliveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void {
    const cols = tagToken.tagValue?.split(' ') || [];
    // gets the options variable name
    const optionName = cols.shift();
    const values = cols.filter(x => x.trim() != '|');;

    // finally, creates a TagItem
    sourceCode.tagItems.push(
      new TagItem(tagToken.tagType, sourceCode, {
        optionName,
        values
      })
    );
    // console.log(liveDocs);
    // console.log(sourceCode);
    // console.log(tagToken);
  }
}
