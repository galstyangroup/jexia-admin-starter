export default function fastpivot(a) {
    "use strict";
    var t = {};
    if ("string" != typeof a && a.length > 0) {
        var l = Object.keys(a[0]),
            n = {};
        l.forEach(function(a) { n[a] = {}, n[a]._labels = [], n[a]._labelsdata = [], n[a]._data = {} }), a.forEach(function(a, t) {
            l.forEach(function(t) {
                var l = a[t];
                n[t]._data[l] = (n[t]._data[l] || 0) + 1, n[t]._labels[l] = null;
            });
        }), l.forEach(function(a) {
            for (var t in n[a]._data) n[a]._labelsdata.push(n[a]._data[t]);
            n[a]._labels = Object.keys(n[a]._labels);
        }), t = n;
    }
    return t;
}