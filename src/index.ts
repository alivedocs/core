import {SourceCode} from './core/SourceCode';

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
export class LiveDocs {
  sourceCodeList: SourceCode[] = [];

  constructor(sourceCodeList: SourceCode[]) {
    this.sourceCodeList = sourceCodeList;
  }
}
