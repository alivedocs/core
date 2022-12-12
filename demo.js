const text = `
// @| Multiline blocks asdasdasd
//     | asdasdasdasdas das das das dasdasd
//     | asdasdasdasdasdasdasdasdasdasd
//     | asdasdas das das das das dasd.

// @|section:MY_SECTION_1
// @|section:MY_SECTION_2
// @|section:MY_SECTION_3


// @|todo:[ ] - asdasdasdas dasd as das.
// @|todo:[x] - asdasdasdas dasd as das.
// @|todo:[ ] - asdasdasdas dasd as das.

// @|todo:[ ]
//     | asdasdasdas dasd as das.
//     | asdasdasdas dasd as das.

// @|code:start(indent=auto)
var teste = 1;
console.log(teste);
// @|code:end

// @| Multiline blocks asdasdasd
//     | asdasdasdasdas das das das dasdasd
//     | asdasdasdasdasdasdasdasdasdasd
//     | asdasdas das das das das dasd.

// @|aaaa:start(a=b)
module "my-example" {
  source = "/foo"
}
// @|aaaa:end

// @|option:MY_ID_OPT asdasdasd | asdasdas | asdasdasd
// @|option:MY_ID_OPT asdasdasd | asdasdas | asdasdasd
`;

const pattern = new RegExp('@\\|([^\n]+)', 'gm');

let match = "";
while (match = pattern.exec(text)) {

  console.log(match.index, match[0]);
}

