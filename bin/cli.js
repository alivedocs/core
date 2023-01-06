const {LiveDocs, PatternScan, Config} = require('../lib');

const config = new Config({
  pattern: 'tests/**/*'
});

const results = new PatternScan(config);

results.scan().then((sourceCodeList) => {
  const liveDocs = new LiveDocs(sourceCodeList);
  liveDocs.toReadme()
  console.log(JSON.stringify(liveDocs.sourceCodeList[0].tagItems, null, 2));
});
