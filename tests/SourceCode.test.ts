import {describe, expect, test} from '@jest/globals';

import {Config} from '../src/config';
import {SourceCode} from '../src/core/SourceCode';

const config = new Config({
  pattern: 'tests/demo-1/**/*',
});

jest.setTimeout(100000);

describe('SourceCode', () => {
  let sourceCode: any;

  beforeAll(async () => {
    sourceCode = new SourceCode(config, 'tests/demo-2/simple.txt');
    await sourceCode.hasDocTypes();
  });

  it('Returns filename source', async () => {
    const text = await sourceCode.stream.then((a: any) => a.toString());
    return expect(text).toBe('// @|section:MY_SECTION\n' + '// line 2\n');
  });
});
