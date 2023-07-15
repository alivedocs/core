type ConfigArgs = {
  root?: string;
  doctag?: string;
  pattern?: string;
  concurrent?: number;
  exclude?: string[];
};

export class Config {
  options: ConfigArgs;

  constructor(options?: ConfigArgs) {
    this.options = Object.assign(
      {
        doctag: '@\\|',
        concurrent: 5,
        root: process.cwd(),
        pattern: '**/*',
        exclude: ['dist/**/*', 'build/**/*', 'lib/**/*', 'node_modules/**/*'],
      },
      options
    );
  }

  get<T>(key: keyof ConfigArgs): T {
    return this.options[key] as unknown as T;
  }
}
