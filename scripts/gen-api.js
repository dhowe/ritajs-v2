let API = {
  RiTa: [
    'alliterations',
    'concordance',
    'conjugate',
    'hasWord',
    'env',
    'pastParticiple',
    'phonemes',
    'posTags',
    'posTagsInline',
    'presentParticiple',
    'stresses',
    'syllables',
    'isAbbrev',
    'isAdjective',
    'isAdverb',
    'isAlliteration',
    'isNoun',
    'isPunctuation',
    'isQuestion',
    'isRhyme',
    'isVerb',
    'kwic',
    'pluralize',
    'random',
    'randomOrdering',
    'randomSeed',
    'randomWord',
    'rhymes',
    'runScript',
    'similarBy',
    'singularize',
    'sentences',
    'stem',
    'tokenize',
    'untokenize',
    'words'
  ]
};

// Signatures
0 && API.RiTa.forEach((f) => {
  console.log('static ' + f + '() {\n  return "";\n}\n');
})

// Tests
1 && API.RiTa.forEach((f) => {
  console.log("it('Should correctly call "+f+"', () => {\n  expect(RiTa."+f+"()).eq('');\n});\n");
})
