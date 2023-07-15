export class TagPatternParser implements ITagPatternParser {
  index: number;
  tagType = '';
  tagValue: string | null = null;
  tagOptions: {[key: string]: any} = {};
  filename: string;
  tokenText: string;

  constructor(index: number, tokenText: string, filename: string) {
    this.index = index;
    this.filename = filename;
    this.tokenText = tokenText;

    const blockType = tokenText.match(/([^\:]+)\:(.*)/);
    if (blockType !== null) {
      this.tagType = blockType[1];
      // process tag values and paramets
      const [value, opts] = this.parseTagValue(blockType[2]);
      this.tagValue = value;
      this.tagOptions = opts;
    } else if (tokenText.split(' ').length > 1) {
      this.tagType = 'text';
      this.tagValue = tokenText;
    }
  }

  parseTagValue(value: string): [string, Object] {
    const result = value.match(/([^\(]+)\(([^\)]+)\)/);
    const opts: {[key: string]: any} = {};

    if (result) {
      result[2].split(',').forEach(v => {
        const [key, value] = v.split('=');
        opts[key.trim()] = value;
      });
      return [result[1], opts];
    }

    return [value, {}];
  }
}
