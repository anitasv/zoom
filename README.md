# Zoom it!
Allows your users to zoom, rotate, and pan images using touch gestures.

For a DEMO open this on mobile: http://anitasv.github.io/zoom/

Type| Link | Size
-|-|-
Minified | http://anitasv.github.io/zoom/zoom-1.0.4.min.js | 1024 bytes
Debugging | http://anitasv.github.io/zoom/zoom-1.0.4.js | 2136 bytes
NPM | https://www.npmjs.com/package/zoom-it | 

For an explanation of math see https://github.com/anitasv/zoom/wiki/Explaining-Math

Send pull requests, bug reports, and feature requests to https://github.com/anitasv/zoom/

# Usage

```html
<div width=320 height=240 style="overflow:hidden;">
    <!-- this doesn't have to be an image -->
    <img id="torotate" width=320 height=240 src="https://lh3.googleusercontent.com/w33i78Rt0j4GHr7SA1luYtBAtmC1DmRHwobUcK1wCKivA_u4VczsDw0CweLmJpUwFRUs=w1920-h1200-no">
</div>

<script type="text/javascript" src="http://anitasv.github.io/zoom/zoom-1.0.4.min.js"> </script>
```

The overflow:hidden is to crop the image moving outside the original border. Be creative. Hotlinking to github.io may get you blocked; so copy to your own location.

```js
var elem = document.getElementById('torotate');
var zm = new Zoom(elem, {
    pan: true,
    rotate: true
});

```
You can do operations like zm.reset() on this object, by default it attaches listeners to the object given.

If you are using NPM, then

```js
var zoom = require("zoom-it");
var wnd = window; // Get this.

var elem = document.getElementById('torotate');
var zm = new zoom.Zoom(elem, {
    pan: true,
    rotate: true
}, wnd);

```
