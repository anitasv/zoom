# zoom
Javascript library to do pinch zoom that preserves scale and rotation correctly.
Pinch to zoom, rotate and translate. 

Double Click to reset.

Library size is 956 bytes (after gzip), 2106 bytes (before gzip)

For a DEMO check this:
    http://anitasv.github.io/zoom/

For an explanation of math see
    https://github.com/anitasv/zoom/wiki/Explaining-Math

# Usage

```html
<div class="container">
    <img id="torotate">
</div>
```
```js
var elem = document.getElementById('torotate');
var zm = new Zoom(elem, {
    pan: true,
    rotate: true
});

// you can do operations like zm.reset() on this object.
```
