import {describe, expect, test} from '@jest/globals';
import {PatternScan} from '../src/core/PatternScan';

import {Config} from '../src/config';
import {AliveDocs} from '../src';

const config = new Config({
  pattern: 'tests/demo-1/**/*',
});

jest.setTimeout(100000);

describe('AliveDocs', () => {
  let AliveDocs: any;

  beforeAll(async () => {
    const results = new PatternScan(config);
    const sourceCodeList = await results.scan();
    AliveDocs = new AliveDocs(sourceCodeList);
  });

  it('Returns filename source', async () => {
    AliveDocs.toReadme();

    // const text = await AliveDocs.stream.then((a: any) => a.toString());
    // return expect(text).toBe(
    //   '// @|section:MY_SECTION\n' +
    //   '// line 2\n'
    // );
  });
});
