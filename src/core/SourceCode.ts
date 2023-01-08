import {promises as fs} from 'fs';

import {TagPatternParser} from './TagPatternParser';
import {TagItem} from './TagItem';

export class SourceCode implements ISourceCode {
  stream: Promise<Buffer>;
  filename: string;
  config: IConfig;
  pattern: RegExp;

  sourceLines: string[] = [];
  tagTokens: TagPatternParser[] = [];
  tagItems: TagItem[] = []

  constructor(config: IConfig, filename: string) {
    this.config = config;
    this.filename = filename;
    this.stream = fs.readFile(filename);
  
    const doctag = this.config.get<string>('doctag');
    this.pattern = new RegExp(`${doctag}([^\n]+)`)
  }

  loadTagTokens(index: number, line: string) {
    const item = line.match(this.pattern);
    if(item) {
      this.tagTokens.push(
        new TagPatternParser(index, item[1], this.filename)
      );
    }
  }

  parseSourceTags(source: string) {
    this.sourceLines = source.toString().split('\n');
    for (let index in this.sourceLines) {
      const sourceLine = this.sourceLines[index];
      this.loadTagTokens(parseInt(index), sourceLine);
    }
  }

  async hasDocTypes(): Promise<boolean> {
    const text = (await this.stream).toString();
    const hasTag = this.pattern.test(text);
    if (hasTag) {
      this.parseSourceTags(text);
    }
    return hasTag;
  }
}
