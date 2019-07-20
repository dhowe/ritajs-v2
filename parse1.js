let input = 'The [a|]';
console.log('\n' + input + '\n');
console.log('\n'+(new(require('./lexparser'))()
  .lexParseVisit(input, {user:{name:'jen'}}, true)));
