

# RitaScript

## Building

```
$ yarn install 
$ yarn test
```
&nbsp;

## Language Elements

### Choice

```
The weather was (sad | gloomy | depressed).
I'm (very | super | really) glad to ((meet | know) you | learn about you).
```

### Weighted Choice

```
The weather was (sad | gloomy [2] | depressed[4]).
```

### Assignment (?)

Basic assignments do not have output, they simply create/modify a symbol
```
{desc: 'wet and cold'}
$desc=wet and cold
$desc=(wet and cold)

The weather was $desc
```

### Inline Assignment

Inline assignments create/modify a symbol _and_ output its contents

| | | 
|-|-|
| `Jane was from [$place=(New York | Berlin | Shanghai)]. $place is cold and wet.` | `Jane was from Berlin. Berlin is cold and wet.` |
| `$place=(New York | Berlin | Shanghai)`<br/>`$place is cold and wet in winter.` | `Berlin is cold and wet in the winter.` |
| `In [$place=(New York | Berlin | Shanghai)] it is cold and wet in winter.` | `In Berlin it is cold and wet in the winter.` |

////////////////////  WORKING HERE /////////////////////////

```
Jane was from [$place=(New York | Berlin | Shanghai)]. 
$place is cold and wet in the winter.

$place=(New York | Berlin | Shanghai) 
$place is cold and wet in the winter.

$place=(New York | Berlin | Shanghai) is cold and wet in the winter.

In [$place=(New York | Berlin | Shanghai)], it is cold and wet in winter.

In [$place=(New York | Berlin | Shanghai) it is cold and wet in winter].
```

### Silent Assignment

```
$place=(New York | Berlin | Shanghai)
Jane was from $place. 
$place is cold and wet in the winter.
```

### Symbols

```
$desc=dark and gloomy
The weather was $desc
```
&nbsp;&nbsp;&nbsp;&nbsp;or 
```
/* 'desc' defined in JS */
The weather was $desc
```

### Transforms

```
The group of boys (to run).conjugate()
How many (tooth | menu | child).pluralize() do you have?
How many (tooth | menu | child).pluralize().toUpper() do you have?

// Resolves choice without repeating
How many (tooth | menu | child).norepeat() do you have?

// Resolves choice in sequence
How many (tooth | menu | child).seq() do you have
```

### Conditionals: If

```
/* 'desc' defined in JS or RS */
{desc='party'} The party was happening
{desc='party', user=$john} The party was happening and John was wearing $John.color.
```
### Conditionals: If-else

```
{adj='positive'} The party was happening :: The party was not happening.
```
&nbsp;&nbsp;&nbsp;&nbsp;or 
```
{adj='positive'} The party was happening.
{adj!='positive'} The party was not happening.
```

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
