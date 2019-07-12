let input = '[$a=[a|b]]';
console.log('\n' + input + '\n');
console.log('\n'+(new(require('./lexparser'))()
  .lexParseVisit(input, {}, true)));
