import * as path from 'path';
import { SourceCode } from '../../../core/SourceCode';
import { TagPatternParser } from '../../../core/TagPatternParser';
import { TagType } from '../../../core/TagType';
import { TagItem } from '../../../core/TagItem';

export class CodeTag extends TagType {
  result: any = {}

  options: any = {
    /**
     * This options automatically
     * indent code and removes left spaces
     * when necessary.
     */
    autoIndent: 'true',

    /**
     * Like specifying language for syntax highlight blocks.
     */
    language: ''
  }

  process(liveDocs: IAliveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void {
    if (tagToken.tagValue) {
      const isStart = /^start/.test(tagToken.tagValue);
      const isEnd = /^end$/.test(tagToken.tagValue);

      // push swapping to share temp values
      if (isEnd) {
        // it must be a start tag, if not throws an error.
        const start = liveDocs.swapping.pop();
        // merge options
        const opts = {...this.options, ...start.tagOptions};

        // convert to bool value
        const autoIndent = opts.autoIndent === 'true';
        const language = opts.language ? opts.language : path.extname(tagToken.filename).replace('.', '');
        const startIndex = parseInt(start.index) + 1;
        const endIndex = tagToken.index;
        
        let sourceLines = sourceCode.sourceLines.slice(startIndex, endIndex);

        let minLeftSpace: any;
        let newSourceLines: string[] = [];
        if (autoIndent) {
          sourceLines.forEach((sourceLine) => {
            if (!minLeftSpace) {
              minLeftSpace = sourceLine.length;
            }
            minLeftSpace = Math.min(minLeftSpace, sourceLine.length - sourceLine.trimLeft().length);
            newSourceLines.push(sourceLine.slice(minLeftSpace, sourceLine.length));
          });
          sourceLines = newSourceLines;
        }

        // finally, creates a TagItem
        sourceCode.tagItems.push(
          new TagItem(tagToken.tagType, sourceCode, {
            autoIndent,
            language: language,
            source: sourceLines.join('\n')
          })
        );
      } else if (isStart) {
        liveDocs.swapping.push(tagToken);
      }
    }
  }
}
