let input = 'The (boy | (girl | woman)).toUpperCase() ate.';
console.log('\n' + input + '\n');
console.log('\n'+(new(require('./lexparser'))()
  .lexParseVisit(input, {}, true)));
