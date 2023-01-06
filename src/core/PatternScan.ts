import {glob} from 'glob';
import {SourceCode} from './SourceCode';
import {Config} from '../config';

export class PatternScan {
  config: Config;
  sourceCodeList: SourceCode[] = [];

  constructor(config: Config) {
    this.config = config;
  }

  async scan(): Promise<SourceCode[]>{
    const root = this.config.get<string>('root');
    const pattern = this.config.get<string>('pattern');
    const exclude = this.config.get<string[]>('exclude');

    return new Promise((resolve, reject) => {
      const results = (err: Error | null, files: string[]) => {
        if (err) {
          reject(err);
          return;
        } else {
          let resolvedCallbacks = 0;
          let totalFiles = files.length;
          
          files.forEach((filename) => {
            const sourceCode = new SourceCode(this.config, filename);
            
            sourceCode.findDocTypes((hasDocTypes: boolean) => {
              resolvedCallbacks += 1;

              // add files that contains doctypes
              hasDocTypes && this.sourceCodeList.push(sourceCode);
              
              if(totalFiles === resolvedCallbacks) {
                resolve(this.sourceCodeList);
              }
            });
          });
        }
      }
      glob(pattern, {
        root: root,
        nodir: true,
        ignore: exclude
      }, results);
    });
  }
}
