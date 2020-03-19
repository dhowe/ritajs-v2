# RitaScript

## Language Elements

### Options

The weather was (sad | gloomy | depressed).
I'm (very | super | really) glad to ((meet | know) you | learn about you).

### Assignment

{desc: 'wet and cold'}
$desc=wet and cold
$desc=(wet and cold)
The weather was $desc

### Inline Assignment

Jane was from $place=(New York | Berlin | Shanghai). 
$place is cold and wet in the winter.

### Symbols

The weather was $desc (desc defined in JS)

### Transforms

The group of boys (to run).conjugate()
How many (tooth | menu | child).pluralize() do you have?
How many (tooth | menu | child).pluralize().toUpper() do you have?

### Labels

&hash;Opening {
 The Fellow will be expected to teach one course. Apart from focusing on their own research and teaching one course, the Fellow will be expected to give a presentation of their scholarship at the Institute. The Fellow will also be expected to participate in the intellectual life of the community.
}

