import {describe, expect, test} from '@jest/globals';
import {PatternScan} from '../src/core/PatternScan';
import {Config} from '../src/config';

const config = new Config({
  pattern: 'tests/demo-1/**/*'
});

jest.setTimeout(100000)

describe('PatternScan', () => {
  let pattern: any;
  let results: any;

  beforeAll(async () => {
    pattern = new PatternScan(config);
    results = await pattern.scan();
  })

  it('Found three results of file that contains docs', () => {
    console.log(results);
    return expect(results).toHaveLength(3);
  });
});
