# scramble
A jQuery plugin that scrambles from one text to the next. Allows for multi-colored multi-element text.

## Demo
[plugins.getdans.info/scramble](http://plugins.getdans.info/scramble)

## Installation
Download from GitHub

### Requirements
jQuery

### Use
```html
<script>
    $(document).ready(function(){
        $('.display-word').scramble({
            textClass: '.word'
        });
    });
</script>
```
### Description

You must call scramble on an empty container where you would like the words to appear. You **MUST** define a textClass in order for scramble to work. Each text must be within a `<span>` element within the container with the textClass. This allows for multi-colored phrases to be used. For example, if you want a phrase with two different colors, you can use<br>`<div class="textClass"><span>Phrase color one </span><span>phrase color two.</span></div>`.

### Example

```html
<div class="display-word"></div>
<ul>
    <li class="word"><span>Word 1.</span></li>
    <li class="word"><span>Phrase </span><span>one</span></li>
    <li class="word"><span>Word 2.</span></li>
    <li class="word"><span>Word 3.</span></li>
    <li class="word"><span>Word 4.</span></li>
</ul>

<script>
    $(document).ready(function(){
        $('.display-word').scramble({
            textClass: '.word'
        });
    });
</script>
```

### Options

Options     | Definition
----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
`textClass` | **(required)**<br>Class of the word containers.<br>The words will appear in the order they are in the DOM.
`possible`  | Possible string scramble can pull from before displaying the correct letter.<br>Does not have to include the letters in the string it is displaying. <br>`default: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'`
`frames`    | Scramble uses `requestAnimationFrame` to go through the possible string.<br>This is the number of frames scramble will go through before finding another random letter from `possible`.<br>`default: 0`
`startTime` | Delay before scramble starts, in milliseconds.<br>`default: 5000`
`interval`  | Time between when a word is revealed and when it is scrambled again for the next word to be displayed.<br>`default: 5000`
