# zoom
Javascript library to do pinch zoom that preserves scale and rotation correctly.
Pinch to zoom, rotate and translate. 

Double Click to reset.

GZIP size of library is about 728 bytes.

For a DEMO check this:
   http://anitasv.github.io/zoom.html

Example
    <pre>
    <code>
    &lt;style&gt; .crop { overflow : hidden; } &lt;/style&gt;
    &lt;div class=&quot;crop&quot; width=202 height=270&gt; 
      &lt;img id=&quot;myImage&quot; width=202 height=270 src=&quot;image.jpg&quot;&gt;
    &lt;/div&gt;
    &lt;script type=&quot;text/javascript&quot; src=&quot;zoom.min.js&quot;&gt;&lt;/script&gt; 
    &lt;script type=&quot;text/javascript&quot;&gt;
      var zImg = new Zoom($('#myImage'));
      // zImg.reset(); can be used to reset the zoom.
    &lt;/script&gt;
    </code>
    </pre>

