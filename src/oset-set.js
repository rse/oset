/*
**  OSet -- Ordered Set Data Structure
**  Copyright (c) 2015-2020 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

export default class OSet {
    /*  create data structure instance  */
    constructor () {
        this._items = 0
        this._ring = {}
        this._ring.prev = this._ring
        this._ring.next = this._ring
        return this
    }

    /*  get number of items  */
    size () {
        return this._items
    }

    /*  get values of all items in order */
    values () {
        return this.each(function (val) {
            this.push(val)
        }, [])
    }

    /*  find values of all items in order matching a predicate  */
    find (predicate, ctx) {
        if (arguments < 2)
            ctx = this
        return this.each(function (val, order) {
            if (predicate.call(ctx, val, order))
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
            iterator.call(ctx, bucket.val, i++)
            bucket = bucket.next
        }
        return ctx
    }

    /*  check whether item exists in set  */
    has (val) {
        let bucket = this._ring.next
        while (bucket !== this._ring) {
            if (bucket.val === val)
                return true
            bucket = bucket.next
        }
        return false
    }

    /*  add item to set  */
    add (val, toFront) {
        if (!this.has(val)) {
            /*  insert new bucket  */
            const bucket = { val: val }
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
            this._items++
        }
        return this
    }

    /*  delete item from set  */
    del (val) {
        let bucket = this._ring.next
        while (bucket !== this._ring) {
            if (bucket.val === val)
                break
            bucket = bucket.next
        }
        if (bucket === this._ring)
            throw new Error("del: no such item")
        bucket.prev.next = bucket.next
        bucket.next.prev = bucket.prev
        delete bucket.prev
        delete bucket.next
        this._items--
        return this
    }

    /*  delete all items  */
    clear () {
        while (this._items > 0)
            this.del(this._ring.next.val)
        return this
    }

    /*  merge with other set  */
    merge (other) {
        other.each((val) => {
            this.add(val)
        })
        other.clear()
        return this
    }

    /*  create new set based on union with other set  */
    union (other) {
        const result = new OSet()
        this.each((val) => {
            result.add(val)
        })
        other.each((val) => {
            result.add(val)
        })
        return result
    }

    /*  create new set based on intersection with other set  */
    intersection (other) {
        const result = new OSet()
        this.each((val) => {
            if (other.has(val))
                result.add(val)
        })
        return result
    }

    /*  create new set based on difference with other set  */
    difference (other) {
        const result = new OSet()
        this.each((val) => {
            if (!other.has(val))
                result.add(val)
        })
        return result
    }

    /*  sort set in-place (comparison by value)  */
    sort (compare) {
        if (typeof compare !== "function") {
            compare = (a, b) => {
                if      (a < b) return -1
                else if (a > b) return +1
                else            return  0
            }
        }
        const vals = this.each(function (val) {
            this.push(val)
        }, [])
        vals.sort(compare)
        this.clear()
        vals.forEach((val) => {
            this.add(val)
        })
        return this
    }
}

