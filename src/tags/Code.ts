import * as path from 'path';
import { LiveDocs } from '..';
import { SourceCode } from '../core/SourceCode';
import { TagPatternParser } from '../core/TagPatternParser';
import { TagType } from '../core/TagType';

export class CodeTag extends TagType {
  options = {
    /**
     * This options automatically
     * indent code and removes left spaces
     * when necessary.
     */
    autoIndent: 'true',

    /**
     * Like specifying language for syntax highlight blocks.
     */
    language: 'txt'
  }

  process(liveDocs: LiveDocs, sourceCode: SourceCode, tagToken: TagPatternParser): void {
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
        console.log(sourceLines.join('\n'));
      } else if (isStart) {
        liveDocs.swapping.push(tagToken);
      }
    }
  }
}
