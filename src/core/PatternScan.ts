import {glob} from 'glob';
import {SourceCode} from './SourceCode';
import {mapLimit} from 'async';

export class PatternScan {
  config: IConfig;
  sourceCodeList: ISourceCode[] = [];

  constructor(config: IConfig) {
    this.config = config;
  }

  async glob(): Promise<String[]> {
    const root = this.config.get<string>('root');
    const pattern = this.config.get<string>('pattern');
    const exclude = this.config.get<string[]>('exclude');

    return new Promise((resolve, reject) => {
      glob(pattern, {
        root: root,
        nodir: true,
        ignore: exclude
      }, (err: Error | null, files: string[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }

  async scan(): Promise<ISourceCode[]>{
    const filenames = await this.glob();
    const concurrent = this.config.get<number>('concurrent');
    return mapLimit(filenames, concurrent, async (filename: any) => {
      const sourceCode = new SourceCode(this.config, filename);
      const hasDocTypes = await sourceCode.hasDocTypes();
      hasDocTypes && this.sourceCodeList.push(sourceCode);
      return sourceCode;
    });
  }
}
