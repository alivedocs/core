import {promises as fs} from 'fs';

import {TagParser} from './TagParser';
import {Config} from '../config';


export class SourceCode {
  stream: Promise<Buffer>;
  filename: string;
  config: Config;
  pattern: RegExp;

  sourceLines: String[] = [];
  tagTokens: TagParser[] = [];

  constructor(config: Config, filename: string) {
    this.config = config;
    this.filename = filename;
    this.stream = fs.readFile(filename);
  
    const doctag = this.config.get<string>('doctag');
    this.pattern = new RegExp(`${doctag}([^\n]+)`)
  }

  loadTagTokens(index: String, line: String) {
    const item = line.match(this.pattern);
    if(item) {
      this.tagTokens.push(
        new TagParser(index, item[1], this.filename)
      );
    }
  }

  parseSourceTags(source: String) {
    this.sourceLines = source.toString().split('\n');
    for (let index in this.sourceLines) {
      const sourceLine = this.sourceLines[index];
      this.loadTagTokens(index, sourceLine);
    }
  }

  findDocTypes(callback: CallableFunction): void {
    this.stream.then((data) => {
      const text = data.toString();
      const hasTag = this.pattern.test(text);
      if (hasTag) {
        this.parseSourceTags(text);
      }
      callback(hasTag);
    });
  }
}
