
OSet
====

Ordered Set/Map Data Structure With Extra Functionality

<p/>
<img src="https://nodei.co/npm/oset.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/oset.png" alt=""/>

About
-----

OSet is a very small JavaScript library, providing ordered set/map data
structures, i.e., data structures which provide set/map functionality
where the insertion order of the items is preserved. These types of data
structures are important if a collection of items should be hold and
it is important to be able to interate over the items in a particular
order, too. The OSet/OMap collections are similar to the ECMAScript 6
Set/Map collections, but provide additional functionality like set/map
merge/union/intersection/difference and sort operations.

Installation
------------

```shell
$ npm install oset
```

Usage
-----

### OSet

`OSet` is similar to ECMAScript `Set`, but with additional functionality.

#### Importing

- `import { OSet } from "oset"`<br/>
   Import OSet (ECMAScript 6 variant).

- `var OSet = require("oset").OSet`<br/>
   Import OSet (CommonJS variant).

#### Main Operations

- `new OSet(): OSet`: [O(1)]<br/>
  Create a new empty set instance.

- `OSet#size(): Number`: [O(1)]<br/>
  Get number of items in the set.

- `OSet#has(val: Object): Boolean`: [O(n)]<br/>
  Check whether item exists.

- `OSet#add(val: Object, toFront?: Boolean): OSet`: [O(n)]<br/>
  Add value to set. If this item is already stored, ignore it.  Else
  insert as a new item into the set (by default to the end of the
  list of elements,
   or, if `toFront` is `true`, to the start of the list of elements).

- `OSet#del(val: Object): OSet`: [O(n)]<br/>
  Delete item from set.
  If no value exists in set an exception is thrown.

#### Extra Operations

- `OSet#clear(): OSet`: [O(n)]<br/>
  Delete all items under `key`.

- `OSet#values(): Object[]`: [O(n)]<br/>
  Get the list of values in the set, in insertion order.

- `OSet#find(predicate: (val: Object, order: Number) => Boolean, ctx: Object): Object[]`: [O(n)]<br/>
  Iterate over all values in the set, in insertion order, and call
  the `predicate` function for each value. The function receives the
  item value and the iteration order (starting from
  zero and steadily increasing). If `predicate` returns `true`
  the value is placed into the result array of items.

- `OSet#each(iterator: (val: Object, order: Number) => Void, ctx: Object): Object`: [O(n)]<br/>
  Iterate over all values in the set, in insertion order, and call
  the `iterator` function for each object. The function receives the
  item value and the iteration order (starting from
  zero and steadily increasing). The function returns the passed `ctx` object.

- `OSet#merge(other: OSet): OSet`: [O(n)]<br/>
  Merge all items of `other` into the set.
  The merged items are removed from `other`.

- `OSet#union(other: OSet): OSet`: [O(n)]<br/>
  Return a new set created through the union of the target set and the
  `other` set. Both the target and the `other` set are not modified.

- `OSet#intersection(other: OSet): OSet`: [O(n)]<br/>
  Return a new set created through the intersection of the target set and the
  `other` set. Both the target and the `other` set are not modified.

- `OSet#difference(other: OSet): OSet`: [O(n)]<br/>
  Return a new set created through the difference/complement of the target set and the
  `other` set. Both the target and the `other` set are not modified.

- `OSet#sort(compare?: (valA: Object, valB: Object) => Number): OSet`: [O(n)]<br/>
  Sort all values in-place by comparing them. The optional `compare` function
  should return -1 if `valA` is less than `valB`, +1 if `valA` is greater than `valB`
  and 0 if `valA` is equal `valB`.

### OMap

`OMap` is similar to ECMAScript `Map`, but with additional functionality.

#### Importing

- `import { OMap } from "oset"`<br/>
   Import OMap (ECMAScript 6 variant).

- `var OMap = require("oset").OMap`<br/>
   Import OMap (CommonJS variant).

#### Main Operations

- `new OMap(): OMap`: [O(1)]<br/>
  Create a new empty map instance.

- `OMap#size(): Number`: [O(1)]<br/>
  Get number of items in the map.

- `OMap#has(key: String): Boolean`: [O(1)]<br/>
  Check whether item exists under `key`.

- `OMap#get(key: String): Object`: [O(1)]<br/>
  Get value of item under `key`.
  If no object exists under `key` the value `undefined` is returned.

- `OMap#set(key: String, val: Object, toFront?: Boolean): OMap`: [O(1)]<br/>
  Set value of item under `key`. If there is already an item stored
  under `key`, replace its value. Else insert as a new item into the map
  (by default to the end of the list of elements,
  or, if `toFront` is `true`, to the start of the list of elements).

- `OMap#del(key: String): OMap`: [O(1)]<br/>
  Delete item under `key`.
  If no object exists under `key` an exception is thrown.

#### Extra Operations

- `OMap#clear(): OMap`: [O(n)]<br/>
  Delete all items under `key`.

- `OMap#keys(): String[]`: [O(n)]<br/>
  Get the list of keys of all items in the map, in insertion order.

- `OMap#values(): Object[]`: [O(n)]<br/>
  Get the list of values of all items in the map, in insertion order.

- `OMap#find(predicate: (val: Object, key: String, order: Number) => Boolean, ctx: Object): Object[]`: [O(n)]<br/>
  Iterate over all items in the map, in insertion order, and call
  the `predicate` function for each object. The function receives the
  item value, the item key and the iteration order (starting from
  zero and steadily increasing). If `predicate` returns `true`
  the item is placed into the result array of items.

- `OMap#each(iterator: (val: Object, key: String, order: Number) => Void, ctx: Object): Object`: [O(n)]<br/>
  Iterate over all items in the map, in insertion order, and call
  the `iterator` function for each object. The function receives the
  item value, the item key and the iteration order (starting from
  zero and steadily increasing). The function returns the passed `ctx` object.

- `OMap#merge(other: OMap): OMap`: [O(n)]<br/>
  Merge all items of `other` into the map.
  The merged items are removed from `other`.

- `OMap#union(other: OMap): OMap`: [O(n)]<br/>
  Return a new map created through the union of the target map and the
  `other` map. Both the target and the `other` map are not modified.

- `OMap#intersection(other: OMap): OMap`: [O(n)]<br/>
  Return a new map created through the intersection of the target map and the
  `other` map. Both the target and the `other` map are not modified.

- `OMap#difference(other: OMap): OMap`: [O(n)]<br/>
  Return a new map created through the difference/complement of the target map and the
  `other` map. Both the target and the `other` map are not modified.

- `OMap#sort(compare?: (keyA: String, keyB: String) => Number): OMap`: [O(n)]<br/>
  Sort all items in-place by comparing their keys. The optional `compare` function
  should return -1 if `keyA` is less than `keyB`, +1 if `keyA` is greater than `keyB`
  and 0 if `keyA` is equal `keyB`.

Implementation Notice
---------------------

Although the OSet library is written in ECMAScript 6, it is transpiled
to ECMAScript 5 and this way runs in really all(!) current (as of 2015)
JavaScript environments, of course.

Internally, the OSet and OMap data structures are based on a managing
all items in a ring of double-linked buckets. This allows efficient
insertion/deletion operations without special cases.

License
-------

Copyright (c) 2015-2023 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

