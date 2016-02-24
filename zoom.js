// Type Matrix is [ [a00, a10], [a01, a11] ]
// Type Vector is [ x, y ]
// Type Transform is [ Matrix, Vector ]

// Multiply Scalar with Vector returns a Vector.
var scmult = function(l, x) {
    return [ l * x[0], l * x[1] ];
};

// Adding two vectors is another vector.
var vcadd = function(a, b) {
    return [ a[0] + b[0], a[1] + b[1] ];
};

// Subtracting two vectors is another vector.
var minus = function(a, b) {
    return [ a[0] - b[0], a[1] - b[1] ];
};

// Dot product of two vectors is a scalar.
var dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

// Exterior Product of two vectors is a pseudoscalar.
var wedge = function(a, b) {
    return a[0] * b[1] - a[1] * b[0];
};

// Apply Matrix on Vector returns a Vector.
var apply = function(A, x) {
    return vcadd(scmult(x[0], A[0]), scmult(x[1], A[1]));
};

// Multiply two matrices.
var mult = function(A, B) {
    return [ apply(A, B[0]), apply(A, B[1]) ];
};

// Multiply two transforms.
var cascade = function(T, U) {
    return [ mult(T[0], U[0]), vcadd(apply(T[0], U[1]), T[1]) ];
};

// Rotation matrix.
var rotate = function(c, s) {
    return [ [ c, s], [-s, c] ];
};

// Rotate + Scale from a to b.
var rotscale = function(a, b) {
    var alen = dot(a, a);
    var sig = dot(a, b);
    var del = wedge(a, b);
    return rotate( sig / alen, del / alen);
};

// Zoom is a similarity preserving transform from a pair of
// positions vectors to a new pair of position vectors. 
var zoom = function(s, d) {
    var a = minus(s[1], s[0]);
    var b = minus(d[1], d[0]);
    var rs = rotscale(a, b);

    // Mid points.
    var m1 = scmult(.5, vcadd(s[0], s[1]));
    var m2 = scmult(.5, vcadd(d[0], d[1]));
 
    // Effective translation.
    var t = minus(m2, m1);

    return [rs, t];
};

var cssMat = function(T) {
    var A = T[0];
    var b = T[1];
    return 'matrix(' + A[0][0] + ',' + A[0][1] + ',' + A[1][0] + ',' + A[1][1] +
            ',' + b[0] + ',' + b[1] + ')';
};

var getCoords = function(t) {
    return [ 
        [t[0].pageX, t[0].pageY],
        [t[1].pageX, t[1].pageY] 
    ];
};

var identity = [ [ [ 1, 0], [0, 1]] , [0, 0] ];

/**
 * @constructor
 * @export
 */
function Zoom(elem) {
    this.elem = elem;
    this.zooming = false;
    this.activeZoom = identity;
    this.currentZoom = null;
    this.srcCoords = [0, 0];

    var me = this;
    var tapped = false;

    elem.on('touchstart', function(evt) {
        var t = evt.originalEvent.touches;
        if (!t) {
            return false;
        }
        evt.preventDefault();
        if (t.length == 2) {
            me.srcCoords = getCoords(t);
            me.zooming = true;
        } else if (t.length == 1) {
            if (!tapped) {
                tapped = setTimeout(function() {
                    tapped = false;
                }, 300);
            } else {
                tapped = false;
                me.reset();
            }
        }
    });
    
    elem.on('touchmove', function(evt) {
        var t = evt.originalEvent.touches;
        if (!t || t.length != 2) {
            return false;
        }
        if (!me.zooming) {
            // To prevent possible potential reorder of events.
            return false;
        }
        evt.preventDefault();
        var destCoords = getCoords(t);
        me.currentZoom = zoom(me.srcCoords, destCoords);
        var finalT = cascade(me.currentZoom, me.activeZoom);
        me.update(finalT);
    });

    elem.on('touchend', function(evt) {
        if (me.zooming) {
            me.activeZoom = cascade(me.currentZoom, me.activeZoom);
            me.zooming = false;
        }
    });

};

Zoom.prototype.update = function(finalT) {
    var str = cssMat(finalT);
    this.elem.css('transform', str);
};

Zoom.prototype.reset = function() {
    this.activeZoom = identity;
    this.zooming = false;
    this.update(this.activeZoom);
};
Zoom.prototype['reset'] = Zoom.prototype.reset;

window['Zoom'] = Zoom;
