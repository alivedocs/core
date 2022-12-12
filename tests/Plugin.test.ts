import {describe, expect, test} from '@jest/globals';
import {PatternScan} from '../src/core/PatternScan';

import {Config} from '../src/config';
import {LiveDocs} from '../src';

const config = new Config({
  pattern: 'tests/demo-1/**/*'
});

jest.setTimeout(100000);

describe('LiveDocs', () => {
  let liveDocs: any;

  beforeAll(async () => {
    const results = new PatternScan(config);
    const sourceCodeList = await results.scan();
    liveDocs = new LiveDocs(sourceCodeList);
  })

  it('Returns filename source', async () => {
    liveDocs.toReadme();
    
    // const text = await liveDocs.stream.then((a: any) => a.toString());
    // return expect(text).toBe(
    //   '// @|section:MY_SECTION\n' +
    //   '// line 2\n'
    // );
  });
});
