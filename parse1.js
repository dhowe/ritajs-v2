let input = 'The ((boy).ucf() | (girl | woman).toUpperCase()) ate.';
console.log('\n' + input + '\n');
console.log('\n'+(new(require('./lexparser'))()
  .lexParseVisit(input, {}, true)));
