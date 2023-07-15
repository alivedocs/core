const {AliveDocs, PatternScan, Config} = require('../lib');
const {Manifest} = require('../lib/core/Manifest');

async function main() {
  const manifest = await Manifest.lookup();

  if (!manifest) {
    throw new Error('invalid manifest configuration');
  }

  const config = new Config({
    pattern: 'tests/**/*',
  });

  const alivedocs = new AliveDocs(config, manifest);

  await alivedocs.run();
  const results = new PatternScan(config);

  results.scan().then(sourceCodeList => {
    console.log(sourceCodeList);
    // const liveDocs = new LiveDocs(sourceCodeList);
    // liveDocs.toReadme()
    // console.log(JSON.stringify(liveDocs.sourceCodeList[0].tagItems, null, 2));
  });
}

main().catch(err => console.log(err));
