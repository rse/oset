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

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OSet = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();Object.defineProperty(exports,"__esModule",{value:!0});var OSet=function(){function e(){return _classCallCheck(this,e),this._items=0,this._index={},this._ring={},this._ring.prev=this._ring,this._ring.next=this._ring,this}return _createClass(e,[{key:"length",value:function(){return this._items}},{key:"keys",value:function(){return this.each(function(e,t){this.push(t)},[])}},{key:"values",value:function(){return this.each(function(e){this.push(e)},[])}},{key:"find",value:function(e,t){return arguments<2&&(t=this),this.each(function(n,i,r){e.call(t,n,i,r)&&this.push(n)},[])}},{key:"each",value:function(e,t){arguments<2&&(t=this);for(var n=0,i=this._ring.next;i!==this._ring;)e.call(t,i.val,i.key,n++),i=i.next;return t}},{key:"has",value:function(e){var t=this._index[e];return void 0!==t}},{key:"get",value:function(e){var t=this._index[e];return void 0===t?void 0:t.val}},{key:"set",value:function(e,t,n){var i=this._index[e];return void 0===i?(i={key:e,val:t},this._index[e]=i,n?(i.next=this._ring.next,i.prev=this._ring,i.next.prev=i,this._ring.next=i):(i.prev=this._ring.prev,i.next=this._ring,i.prev.next=i,this._ring.prev=i),this._items++):i.val=t,this}},{key:"del",value:function(e){var t=this._index[e];if(void 0===t)throw new Error("del: no such item");return delete this._index[e],t.prev.next=t.next,t.next.prev=t.prev,delete t.prev,delete t.next,this._items--,this}},{key:"clear",value:function(){for(;this._items>0;)this.del(this._ring.prev.key);return this}},{key:"merge",value:function(e){var t=this;return e.each(function(e,n){t.set(n,e)}),e.clear(),this}},{key:"union",value:function(t){var n=new e;return this.each(function(e,t){n.set(t,e)}),t.each(function(e,t){n.set(t,e)}),n}},{key:"intersection",value:function(t){var n=new e;return this.each(function(e,i){if(t.has(i)){if(t.get(i)!==e)throw new Error('intersect: different values under key "'+i+'"');n.set(i,e)}}),n}},{key:"difference",value:function(t){var n=new e;return this.each(function(e,i){t.has(i)||n.set(i,e)}),n}}]),e}();exports["default"]=OSet;
},{}]},{},[1])(1)
});


//# sourceMappingURL=bundle.map