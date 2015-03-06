/*
**  OSet -- Ordered Set Data Structure
**  Copyright (c) 2015 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OrderedSet = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";var _prototypeProperties=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},OSet=function(){function e(){return _classCallCheck(this,e),this._items=0,this._index={},this._ring={},this._ring.prev=this._ring,this._ring.next=this._ring,this}return _prototypeProperties(e,null,{length:{value:function(){return this._items},writable:!0,configurable:!0},keys:{value:function(){return this.each(function(e,t){this.push(t)},[])},writable:!0,configurable:!0},values:{value:function(){return this.each(function(e){this.push(e)},[])},writable:!0,configurable:!0},find:{value:function(e,t){return arguments<2&&(t=this),this.each(function(i,n,r){e.call(t,i,n,r)&&this.push(i)},[])},writable:!0,configurable:!0},each:{value:function(e,t){arguments<2&&(t=this);for(var i=0,n=this._ring.next;n!==this._ring;)e.call(t,n.val,n.key,i++),n=n.next;return t},writable:!0,configurable:!0},has:{value:function(e){var t=this._index[e];return void 0!==t},writable:!0,configurable:!0},get:{value:function(e){var t=this._index[e];return void 0===t?void 0:t.val},writable:!0,configurable:!0},set:{value:function(e,t,i){var n=this._index[e];return void 0===n?(n={key:e,val:t},this._index[e]=n,i?(n.next=this._ring.next,n.prev=this._ring,n.next.prev=n,this._ring.next=n):(n.prev=this._ring.prev,n.next=this._ring,n.prev.next=n,this._ring.prev=n),this._items++):n.val=t,this},writable:!0,configurable:!0},del:{value:function(e){var t=this._index[e];if(void 0===t)throw new Error("del: no such item");return delete this._index[e],t.prev.next=t.next,t.next.prev=t.prev,delete t.prev,delete t.next,this._items--,this},writable:!0,configurable:!0},clear:{value:function(){for(;this._items>0;)this.del(this._ring.prev.key);return this},writable:!0,configurable:!0},merge:{value:function(e){var t=this;return e.each(function(e,i){t.set(i,e)}),e.clear(),this},writable:!0,configurable:!0},union:{value:function(t){var i=new e;return this.each(function(e,t){i.set(t,e)}),t.each(function(e,t){i.set(t,e)}),i},writable:!0,configurable:!0},intersection:{value:function(t){var i=new e;return this.each(function(e,n){if(t.has(n)){if(t.get(n)!==e)throw new Error('intersect: different values under key "'+n+'"');i.set(n,e)}}),i},writable:!0,configurable:!0},difference:{value:function(t){var i=new e;return this.each(function(e,n){t.has(n)||i.set(n,e)}),i},writable:!0,configurable:!0}}),e}();module.exports=OSet;
},{}]},{},[1])(1)
});


//# sourceMappingURL=bundle.map