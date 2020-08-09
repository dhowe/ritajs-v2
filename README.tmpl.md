## Installation

* For node: `npm install rita@beta`
* For [the browser](https://github.com/dhowe/rita2js/releases/download/v@VERSION@/rita-web.js) (1.3mb)
* For [the browser (no lexicon)](https://github.com/dhowe/rita2js/releases/download/v@VERSION@/rita-web-nolex.js) (.5mb)
* For [developers](#developing)

### Example (node)

```
let RiTa = require('rita');
console.log(RiTa.rhymes('sweet'));

let grammar = new RiTa.Grammar(jsonRules);
console.log(grammar.expand());
```

## API

  <table cellspacing="0" cellpadding="0" border="0">
   <tr>
    <th colspan=2>RiTa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </th>
    <th>RiTa.Markov</th>
    <th> &nbsp; RiTa.Grammar &nbsp; </th>
   </tr>
   <tr>
<td>
    <a href="https://rednoise.org/rita2/RiTa/addTransform/index.html">RiTa.addTransform()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/alliterations/index.html">RiTa.alliterations()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/concordance/index.html">RiTa.concordance()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/conjugate/index.html">RiTa.conjugate()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/evaluate/index.html">RiTa.evaluate()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/hasWord/index.html">RiTa.hasWord()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isAbbreviation/index.html">RiTa.isAbbreviation()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isAdjective/index.html">RiTa.isAdjective()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isAdverb/index.html">RiTa.isAdverb()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isAlliteration/index.html">RiTa.isAlliteration()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isNoun/index.html">RiTa.isNoun()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isPunctuation/index.html">RiTa.isPunctuation()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isQuestion/index.html">RiTa.isQuestion()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isRhyme/index.html">RiTa.isRhyme()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/isVerb/index.html">RiTa.isVerb()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/kwic/index.html">RiTa.kwic()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/pastParticiple/index.html">RiTa.pastParticiple()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/phonemes/index.html">RiTa.phonemes()</a><br/>
   </td>
   <td>
    <a href="https://rednoise.org/rita2/RiTa/pos/index.html">RiTa.pos()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/posInline/index.html">RiTa.posInline()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/presentParticiple/index.html">RiTa.presentParticiple()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/pluralize/index.html">RiTa.pluralize()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/randomOrdering/index.html">RiTa.randomOrdering()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/randomSeed/index.html">RiTa.randomSeed()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/randomWord/index.html">RiTa.randomWord()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/rhymes/index.html">RiTa.rhymes()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/search/index.html">RiTa.search()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/sentences/index.html">RiTa.sentences()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/similars/index.html">RiTa.similars()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/singularize/index.html">RiTa.singularize()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/soundsLike/index.html">RiTa.soundsLike()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/spellsLike/index.html">RiTa.spellsLike()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/stem/index.html">RiTa.stem()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/stresses/index.html">RiTa.stresses()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/syllables/index.html">RiTa.syllables()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/tokenize/index.html">RiTa.tokenize()</a><br/>
    <a href="https://rednoise.org/rita2/RiTa/untokenize/index.html">RiTa.untokenize()</a><br/>
   </td>
   <td>
    <a href="https://rednoise.org/rita2/Markov/addText/index.html">addText()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/completions/index.html">completions()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/generate/index.html">generate()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/probability/index.html">probability()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/probabilities/index.html">probabilities()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/size/index.html">size()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/toString/index.html">toString()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/toJSON/index.html">toJSON()</a><br/>
    <a href="https://rednoise.org/rita2/Markov/fromJSON/index.html">Markov.fromJSON()</a><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
   </td>
   <td>
    <a href="https://rednoise.org/rita2/Grammar/addRule/index.html">addRule()</a><br/>
    <a href="https://rednoise.org/rita2/Grammar/expand/index.html">expand()</a><br/>
    <a href="https://rednoise.org/rita2/Grammar/removeRule/index.html">removeRule()</a><br/>
    <a href="https://rednoise.org/rita2/Grammar/setRules/index.html">setRules()</a><br/>
    <a href="https://rednoise.org/rita2/Grammar/toString/index.html">toString()</a><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
   </td>
 </tr>
</table>
&nbsp;

## RiTaScript

RiTaScript can be used as part of any grammar (via RiTa.Grammar) or can be run directly using RiTa.evaluate() 


### Choice
Select a random choice from a group of options:
```
The weather was (sad | gloomy | depressed).  ->  "The weather was gloomy." 
I'm (very | super | really) glad to ((meet | know) you | learn about you).  ->  "I'm very glad to know you." 
```
<br>

Use the seq() transform to output the Choice options in a linear sequence:
```
The weather was (sad | gloomy | depressed).seq()  ->  
  0) "The weather was sad" 
  1) "The weather was gloomy" 
  2) "The weather was depressed" 
  3) "The weather was sad" 
  ...
```

Use the rseq() transform to output the Choice options in a randomized, non-repeating sequence:
```
The weather was (sad | gloomy | depressed).rseq()  ->  
  0) "The weather was depressed" 
  1) "The weather was gloomy" 
  2) "The weather was sad" 
  3) "The weather was gloomy" 
  ...
```

Use the norep() transform to ensure outputs never repeats:
```
The weather was (sad | gloomy | depressed).norep()  ->  
  0) "The weather was depressed" 
  1) "The weather was gloomy" 
  2) "The weather was depressed" 
  3) "The weather was sad" 
  4) "The weather was gloomy" 
  ...
```

### Weighted Choice
Assign probabilities to choice selection

```
The weather was (sad | gloomy [2] | depressed[4]).  ->  "The weather was depressed." 
```

### Assignment
Basic assignments do not have output, they simply create or update a variable to be used elsewhere (variables in JavaScript may also be used when passed in via the scripts 'context')

```
$desc=wet and cold
The weather was $desc  ->  "The weather was wet and cold" 
```

### Inline Assignment

Inline assignments allow one to easily set a variable, output it, and refer to it later:

```
Jane was from [$place=(New York | Berlin | Shanghai)]. 
$place is cold and wet. 
     ->  "Jane was from Berlin. Berlin is cold and wet."

$place=(New York | Berlin | Shanghai)
$place is cold and wet in winter. 
     ->  "Berlin is cold and wet in the winter."
    
In [$place=(New York | Berlin | Shanghai)] it is cold and wet in winter. 
     ->  "In Berlin it is cold and wet in the winter."
```


### Transforms
Allow for modification of variables, choices, and raw text. RiScript comes with a number of useful transforms enabled (including pluralize(), capitalize(), and articlize()), which can be nested to create complex expressions. User-defined transforms can be added using RiTa.addTransform() or by passing a transform function as part of the script's 'context'.
```
How many (tooth | menu | child).pluralize() do you have?
How many (tooth | menu | child).pluralize().toUpper() do you have?
He grew up to be $animal.articlize().
He grew up to be (anteater).articlize().
He grew up to be (anteater).articlize().myCustomTransform().
```



<!--
### Choice

// Resolves choice without repeating
How many (tooth | menu | child).norepeat() do you have?

// Resolves choice in sequence
How many (tooth | menu | child).seq() do you have?

| | | 
|-|-|
| The weather was (sad &#124; gloomy &#124; depressed). | "The weather was depressed." |
| I'm (very &#124; super &#124; really) glad to ((meet &#124; know) you &#124; learn about you). | "I'm very glad to know you." |


### Weighted Choice
| | | 
|-|-|
| The weather was (sad &#124; gloomy [2] &#124; depressed[4]). | "The weather was gloomy." |

### Assignment

Basic assignments do not have output, they simply create/update a symbol
| | | 
|-|-|
|$desc=wet and cold||
|The weather was $desc|"The weather was wet and cold"|

### Inline Assignment

Inline assignments create/modify a symbol _and_ output its contents

| | | 
|-|-|
| `Jane was from [$place=(New York | Berlin | Shanghai)]. $place is cold and wet.` | `Jane was from Berlin. Berlin is cold and wet.` |
| `$place=(New York | Berlin | Shanghai)`<br/>`$place is cold and wet in winter.` | `Berlin is cold and wet in the winter.` |
| `In [$place=(New York | Berlin | Shanghai)] it is cold and wet in winter.` | `In Berlin it is cold and wet in the winter.` |


```
Jane was from [$place=(New York | Berlin | Shanghai)]. 
$place is cold and wet in the winter.

$place=(New York | Berlin | Shanghai) 
$place is cold and wet in the winter.

$place=(New York | Berlin | Shanghai) is cold and wet in the winter.

In [$place=(New York | Berlin | Shanghai)], it is cold and wet in winter.

In [$place=(New York | Berlin | Shanghai) it is cold and wet in winter].

```

### Symbols
Variables (or symbols) can be defined in RiScript or in JavaScript (and passed in via the 'context' argument)
```
$desc=dark and gloomy
The weather was $desc
```
&nbsp;&nbsp;&nbsp;&nbsp;or 
```
/* 'desc' defined in JS */
The weather was $desc
```
-->
### Conditionals
Allow for conditional execution, based on the values of one or more variables
```
// 'desc' can be defined in JS or RS */
{desc='party'} The party was happening
{desc='party', user=$john} The party was happening and John was wearing $John.color.
```
<!--
### Conditionals: If-else

```
{adj='positive'} The party was happening :: The party was not happening.
```
&nbsp;&nbsp;&nbsp;&nbsp;or 
```
{adj='positive'} The party was happening.
{adj!='positive'} The party was not happening.
```
<!--
### Labels
```
#Opening {
 The Fellow will be expected to teach one course. Apart from focusing on their own research and \
 teaching one course, the Fellow will be expected to give a presentation of their scholarship at the \
 Institute. The Fellow will also be expected to participate in the intellectual life of the community.
}

$Opening=(
 The Fellow will be expected to teach one course. Apart from focusing on their own research and \
 teaching one course, the Fellow will be expected to give a presentation of their scholarship at the \
 Institute. The Fellow will also be expected to participate in the intellectual life of the community.
)
```
-->

&nbsp;

## Developing
To build the library and run tests (with node/yarn/mocha):
```

$ git clone https://github.com/dhowe/rita2js.git
$ cd rita2js && yarn install && yarn compile
$ yarn test

```
&nbsp;
