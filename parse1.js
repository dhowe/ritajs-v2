let input = '$foo=a';
console.log('\n' + input + '\n');
console.log('\n'+(new(require('./src/parser'))()
  .lexParseVisit(input, {user:{name:'jen'}}, true)));
