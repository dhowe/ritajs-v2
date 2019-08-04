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
    'parseDial',
    'similarBy',
    'singularize',
    'sentences',
    'stem',
    'tokenize',
    'untokenize',
    'words'
  ]
};

API.RiTa.forEach((f) => {
  console.log('static ' + f + '() {\n  return "";\n}\n');
})
