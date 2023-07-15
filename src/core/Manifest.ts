import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export class Manifest implements IManifest {
  static async lookup() {
    const ymlFile = path.join(process.cwd(), 'alivedocs.yml');
    const yamlFile = path.join(process.cwd(), 'alivedocs.yaml');

    let manifestFile;
    if (fs.existsSync(ymlFile)) {
      manifestFile = ymlFile;
    } else if (fs.existsSync(yamlFile)) {
      manifestFile = yamlFile;
    }

    if (!manifestFile) {
      console.warn('no manifest found');
      process.exit(1);
    }

    try {
      const source = yaml.load(fs.readFileSync(manifestFile, 'utf8'));
      return new Manifest(source);
    } catch (e) {
      return null;
    }
  }

  options: any = {};
  plugins: IPlugin[] = [];

  constructor(options: any) {
    this.plugins = options.plugins;
  }
}
