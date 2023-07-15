import {BasePlugin} from './built-in/base';

export class PluginManager {
  alivedocs: IAliveDocs;
  plugins: IPlugin[] = [];

  // all available hooks
  lifecycleHooks: any = {
    'before:tag:initialize': [],
    'tag:initialize': [],
    'after:tag:initialize': [],
  };

  constructor(alivedocs: IAliveDocs) {
    this.alivedocs = alivedocs;
  }

  callHook(hookId: string) {
    // console.log(this.lifecycleHooks);
    if (hookId in this.lifecycleHooks) {
      this.lifecycleHooks[hookId].push(() => {});
    }
  }

  async loadPlugins(plugins: IPlugin[]) {
    // load default plugins
    this.plugins.push(new BasePlugin(this.alivedocs));

    for (const option of plugins) {
      const [pluginName] = Object.keys(option);
      await this.addPlugin(pluginName);
    }

    // register hooks
    for (const plugin of this.plugins) {
      console.log(plugin.hooks);
    }
  }

  async addPlugin(plugin: string) {
    return import(plugin).then(PluginClass => {
      const pluginInstance = new PluginClass(this.alivedocs);
      this.plugins.push(pluginInstance);
    });
  }
}
