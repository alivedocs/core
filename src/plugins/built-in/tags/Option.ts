import {TagItem} from '../../../core/TagItem';

export class OptionTag implements ITagType {
  options: any = {};
  process(
    livedocs: IAliveDocs,
    sourceCode: ISourceCode,
    tagToken: ITagPatternParser
  ): void {
    const cols = tagToken.tagValue?.split(' ') || [];
    // gets the options variable name
    const optionName = cols.shift();
    const values = cols.filter(x => x.trim() != '|');

    // finally, creates a TagItem
    sourceCode.tagItems.push(
      new TagItem(tagToken.tagType, sourceCode, {
        optionName,
        values,
      })
    );
  }
}
