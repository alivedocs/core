import {describe, expect, test} from '@jest/globals';
import {PatternScan} from '../src/core/PatternScan';
import {Config} from '../src/config';

const config = new Config({
  pattern: 'tests/demo-1/**/*',
});

jest.setTimeout(100000);

describe('PatternScan', () => {
  let pattern: any;
  let results: any;

  beforeAll(async () => {
    pattern = new PatternScan(config);
    results = await pattern.scan();
    console.log(results[0]);
  });

  it('Found three results of file that contains docs', () => {
    return expect(results).toHaveLength(3);
  });
});
