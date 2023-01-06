import { TagType } from './core/TagType';
import {Config} from './config';
import {SourceCode} from './core/SourceCode';
import {PatternScan} from './core/PatternScan';
import {TagPatternParser} from './core/TagPatternParser';

// Plugins 
import {CodeTag} from './tags/Code';
import {OptionTag} from './tags/Option';
import {SectionTag} from './tags/Section';

/***
 * @D|section:MY_ID
 *     | asdasdasdasd asd asd asd as dasdasd
 *     | asdasdasdsaddasasdasd
 *     | asdasdasdasdadsasd
 * 
 * @D|option:MY_ENVIRONEMNTS
 *     | MyTesteOption
 *     | `false`
 *     | My options that do that does xyz.
 */
class LiveDocs {
  sourceCodeList: SourceCode[] = [];

  tagTypes: {[key: string]: TagType} = {
    'code': new CodeTag,
    'option': new OptionTag,
    'section': new SectionTag,
  }

  swapping: any[] = []

  constructor(sourceCodeList: SourceCode[]) {
    this.sourceCodeList = sourceCodeList;
  }

  toReadme() {
    this.sourceCodeList.forEach((sourceCode) => {
      sourceCode.tagTokens.forEach((tagToken: TagPatternParser) => {
        const tagTypeParser = this.tagTypes[tagToken.tagType];
        if (tagTypeParser) {
          tagTypeParser.process(this, sourceCode, tagToken);
        } else {
          // console.warn(`Invalid tag pattern ${tagToken.tagType}`);
        }
      })
    });
  }
}

export {LiveDocs, SourceCode, Config, PatternScan};
