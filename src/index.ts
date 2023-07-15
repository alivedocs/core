import {Config} from './config';
import {SourceCode} from './core/SourceCode';
import {PatternScan} from './core/PatternScan';

// Plugins
import {PluginManager} from './plugins/manager';

class AliveDocs implements IAliveDocs {
  sourceCodeList: ISourceCode[] = [];

  config: IConfig;
  manifest: IManifest;
  plugins: IPlugin[] = [];
  pluginManager: PluginManager;
  tagTypes: {[key: string]: ITagType} = {};

  swapping: any[] = [];

  constructor(config: IConfig, manifest: IManifest) {
    this.config = config;
    this.manifest = manifest;
    // this.sourceCodeList = sourceCodeList;
    this.pluginManager = new PluginManager(this);
  }

  addTagType(key: string, tagClass: ITagType) {
    this.pluginManager.callHook('before:tag:initialize');
    this.tagTypes[key] = tagClass;
    this.pluginManager.callHook('after:tag:initialize');
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
