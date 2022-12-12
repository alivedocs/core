export class TagParser {
  index: String;
  tagType: String| null = null;
  tagValue: String| null = null;
  filename: String;
  tokenText: String;

  constructor(index: String, tokenText: String, filename: string) {
    this.index = index;
    this.filename = filename;
    this.tokenText = tokenText;

    const blockType = tokenText.match(/([^\:]+)\:(.*)/);
    if(blockType !== null) {
      this.tagType = blockType[1];
      this.tagValue = blockType[2];
    } else if (tokenText.split(' ').length > 1) {
      this.tagType = 'text';
      this.tagValue = tokenText;
    }
  }
}
