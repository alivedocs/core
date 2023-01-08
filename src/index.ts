import { TagType } from './core/TagType';
import {Config} from './config';
import {Manifest} from './core/Manifest';
import {SourceCode} from './core/SourceCode';
import {PatternScan} from './core/PatternScan';
import {TagPatternParser} from './core/TagPatternParser';

// Plugins 
import {PluginManager} from './plugins/manager';

class AliveDocs implements IAliveDocs {
  // sourceCodeList: SourceCode[] = [];

  config: Config;
  manifest: Manifest;
  plugins: IPlugin[] = []
  pluginManager: PluginManager;
  tagTypes: {[key: string]: TagType} = {}

  swapping: any[] = []

  constructor(config: Config, manifest: Manifest) {
    this.config = config;
    this.manifest = manifest;
    // this.sourceCodeList = sourceCodeList;

    this.pluginManager = new PluginManager(this);
  }

  addTagType(key: string, tagClass: TagType) {
    this.tagTypes[key] = tagClass;
  }

  async run() {
    await this.pluginManager.loadPlugins(this.manifest.plugins);
  }

  // toReadme() {
  //   this.sourceCodeList.forEach((sourceCode) => {
  //     sourceCode.tagTokens.forEach((tagToken: TagPatternParser) => {
  //       const tagTypeParser = this.tagTypes[tagToken.tagType];
  //       if (tagTypeParser) {
  //         tagTypeParser.process(this, sourceCode, tagToken);
  //       } else {
  //         // console.warn(`Invalid tag pattern ${tagToken.tagType}`);
  //       }
  //     })
  //   });
  // }
}

export {AliveDocs, SourceCode, Config, PatternScan};
