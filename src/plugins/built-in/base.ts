import {CodeTag} from './tags/Code';
import {OptionTag} from './tags/Option';
import {SectionTag} from './tags/Section';

export class BasePlugin {
  hooks = {}

  constructor(alivedocs: IAliveDocs) {
    alivedocs.addTagType('code', new CodeTag);
    alivedocs.addTagType('option', new OptionTag);
    alivedocs.addTagType('section', new SectionTag);
  }
}
