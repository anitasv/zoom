# zoom
Javascript library to do pinch zoom that preserves scale and rotation correctly.
Pinch to zoom, rotate and translate. 

Double Click to reset.

Library size is 956 bytes (after gzip), 2106 bytes (before gzip)

Minified: http://anitasv.github.io/zoom/zoom-1.0.0.min.js

Unminified (for debugging purposes): http://anitasv.github.io/zoom/zoom-1.0.0.js

For a DEMO check this:
    http://anitasv.github.io/zoom/

For an explanation of math see
    https://github.com/anitasv/zoom/wiki/Explaining-Math

# Usage

```html
<div>
    <img id="torotate">
</div>
```
The container can decide to hide overflow if need like in the demo.

```js
var elem = document.getElementById('torotate');
var zm = new Zoom(elem, {
    pan: true,
    rotate: true
});

```
You can do operations like zm.reset() on this object, by default it attaches listeners to the object given.

