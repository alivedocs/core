const {LiveDocs, PatternScan, Config} = require('../lib');

const config = new Config({
  pattern: 'tests/demo-1/**/*'
});

const results = new PatternScan(config);
results.scan().then((sourceCodeList) => {
  const liveDocs = new LiveDocs(sourceCodeList);
  liveDocs.toReadme()
  console.log(liveDocs.sourceCodeList[0].tagItems);
});

// import {Config} from '../src/config';
// import {LiveDocs} from '../src';

// const config = new Config({
//   pattern: 'tests/demo-1/**/*'
// });

// jest.setTimeout(100000);

// describe('LiveDocs', () => {
//   let liveDocs: any;

//   beforeAll(async () => {
//     const results = new PatternScan(config);
//     const sourceCodeList = await results.scan();
//     liveDocs = new LiveDocs(sourceCodeList);
//   })

//   it('Returns filename source', async () => {
//     liveDocs.toReadme();
    
//     // const text = await liveDocs.stream.then((a: any) => a.toString());
//     // return expect(text).toBe(
//     //   '// @|section:MY_SECTION\n' +
//     //   '// line 2\n'
//     // );
//   });
// });
