/*
**  OSet -- Ordered Set Data Structure
**  Copyright (c) 2015-2018 Ralf S. Engelschall <rse@engelschall.com>
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

export default class OMap {
    /*  create data structure instance  */
    constructor () {
        this._items = 0
        this._index = {}
        this._ring = {}
        this._ring.prev = this._ring
        this._ring.next = this._ring
        return this
    }

    /*  get number of items  */
    size () {
        return this._items
    }

    /*  get keys of all items in order  */
    keys () {
        return this.each(function (val, key) {
            this.push(key)
        }, [])
    }

    /*  get values of all items in order */
    values () {
        return this.each(function (val /*, key */) {
            this.push(val)
        }, [])
    }

    /*  find values of all items in order matching a predicate  */
    find (predicate, ctx) {
        if (arguments < 2)
            ctx = this
        return this.each(function (val, key, order) {
            if (predicate.call(ctx, val, key, order))
                this.push(val)
        }, [])
    }

    /*  iterate over all items in order  */
    each (iterator, ctx) {
        if (arguments < 2)
            ctx = this
        let i = 0
        let bucket = this._ring.next
        while (bucket !== this._ring) {
            iterator.call(ctx, bucket.val, bucket.key, i++)
            bucket = bucket.next
        }
        return ctx
    }

    /*  check whether item exists under key  */
    has (key) {
        let bucket = this._index[key]
        return (bucket !== undefined)
    }

    /*  get value under key  */
    get (key) {
        let bucket = this._index[key]
        if (bucket === undefined)
            return undefined
        return bucket.val
    }

    /*  set value under key  */
    set (key, val, toFront) {
        let bucket = this._index[key]
        if (bucket === undefined) {
            /*  insert new bucket  */
            bucket = { key: key, val: val }
            this._index[key] = bucket
            if (toFront) {
                bucket.next = this._ring.next
                bucket.prev = this._ring
                bucket.next.prev = bucket
                this._ring.next  = bucket
            }
            else {
                bucket.prev = this._ring.prev
                bucket.next = this._ring
                bucket.prev.next = bucket
                this._ring.prev  = bucket
            }
            this._items++;
        }
        else {
            /*  replace existing bucket  */
            bucket.val = val
        }
        return this
    }

    /*  delete item under key  */
    del (key) {
        let bucket = this._index[key]
        if (bucket === undefined)
            throw new Error("del: no such item")
        delete this._index[key]
        bucket.prev.next = bucket.next
        bucket.next.prev = bucket.prev
        delete bucket.prev
        delete bucket.next
        this._items--;
        return this
    }

    /*  delete all items  */
    clear () {
        while (this._items > 0)
            this.del(this._ring.next.key)
        return this
    }

    /*  merge with other map  */
    merge (other) {
        other.each((val, key) => {
            this.set(key, val)
        })
        other.clear()
        return this
    }

    /*  create new map based on union with other map  */
    union (other) {
        let result = new OMap()
        this.each((val, key) => {
            result.set(key, val)
        })
        other.each((val, key) => {
            result.set(key, val)
        })
        return result
    }

    /*  create new map based on intersection with other map  */
    intersection (other) {
        let result = new OMap()
        this.each((val, key) => {
            if (other.has(key)) {
                if (other.get(key) !== val)
                    throw new Error("intersect: different values under key \"" + key + "\"")
                result.set(key, val)
            }
        })
        return result
    }

    /*  create new map based on difference with other map  */
    difference (other) {
        let result = new OMap()
        this.each((val, key) => {
            if (!other.has(key))
                result.set(key, val)
        })
        return result
    }

    /*  sort map in-place (comparison by key)  */
    sort (compare) {
        if (typeof compare !== "function") {
            compare = (a, b) => {
                if      (a < b) return -1
                else if (a > b) return +1
                else            return  0
            }
        }
        let keyvals = this.each(function (val, key) {
            this.push({ key, val })
        }, [])
        keyvals.sort((a, b) => compare(a.key, b.key))
        this.clear()
        keyvals.forEach((keyval) => {
            this.set(keyval.key, keyval.val)
        })
        return this
    }
}

