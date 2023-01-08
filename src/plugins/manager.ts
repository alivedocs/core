import {BasePlugin} from './built-in/base';

export class PluginManager {
  alivedocs: IAliveDocs;
  plugins: IPlugin[] = [];

  constructor(alivedocs: IAliveDocs) {
    this.alivedocs = alivedocs;
    this.plugins.push(new BasePlugin(alivedocs));
  }

  async loadPlugins(plugins: IPlugin[]) {
    for(let option of plugins) {
      const [pluginName] = Object.keys(option);
      this.addPlugin(pluginName);
    }
  }

  async addPlugin(plugin: string) {
    return import(plugin).then(PluginClass => {
      this.plugins.push(new PluginClass(this.alivedocs));
    });
  }
}
