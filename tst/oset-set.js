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

/* global describe: false */
/* global it: false */
/* global expect: false */
/* global require: false */
/* jshint -W030: false */

var OSet = require("../lib/oset.js").OSet

describe("OSet Data Structure", function () {
    it("should expose its official API", function () {
        var oset = new OSet()
        expect(oset).to.be.a("object")
        expect(oset).to.respondTo("size")
        expect(oset).to.respondTo("values")
        expect(oset).to.respondTo("find")
        expect(oset).to.respondTo("each")
        expect(oset).to.respondTo("has")
        expect(oset).to.respondTo("add")
        expect(oset).to.respondTo("del")
        expect(oset).to.respondTo("clear")
        expect(oset).to.respondTo("merge")
        expect(oset).to.respondTo("union")
        expect(oset).to.respondTo("intersection")
        expect(oset).to.respondTo("difference")
    })
    it("should have the expected has/add/del functionality", function () {
        var oset = new OSet()
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.false
        oset.add("foo")
        oset.add("bar")
        oset.add("quux")
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.true
        expect(oset.has("bar")).to.be.a("boolean").and.to.be.true
        expect(oset.has("quux")).to.be.a("boolean").and.to.be.true
        oset.del("foo")
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.false
    })
    it("should be correctly preserve the insertion order", function () {
        var oset = new OSet()
        oset.add("item2")
        oset.add("item3")
        oset.add("item1", true)
        oset.add("item0", true)
        expect(oset.values()).to.be.deep.equal([ "item0", "item1", "item2", "item3" ])
    })
    it("should have the expected size/values/find/each/clear functionality", function () {
        var oset = new OSet()
        expect(oset.size()).to.be.a("number").and.to.be.equal(0)
        oset.add("foo")
        oset.add("bar")
        oset.add("baz")
        oset.add("quux")
        oset.add(42)
        oset.add(true)
        expect(oset.size()).to.be.a("number").and.to.be.equal(6)
        expect(oset.values()).to.be.deep.equal([ "foo", "bar", "baz", "quux", 42, true ])
        expect(oset.find(function (val) { return (typeof val === "string") })).to.be.deep.equal([ "foo", "bar", "baz", "quux" ])
        /* each is already indirectly tested here */
        oset.clear()
        expect(oset.size()).to.be.a("number").and.to.be.equal(0)
    })
    it("should have the expected merge/union/intersection/difference functionality", function () {
        var oset1 = new OSet()
        var oset2 = new OSet()
        oset1.add("foo")
        oset2.add("baz")
        expect(oset1.size()).to.be.a("number").and.to.be.equal(1)
        expect(oset2.size()).to.be.a("number").and.to.be.equal(1)
        oset1.merge(oset2)
        expect(oset1.size()).to.be.a("number").and.to.be.equal(2)
        expect(oset2.size()).to.be.a("number").and.to.be.equal(0)
        oset2.add("baz")
        oset2.add("quux")
        var oset3 = oset1.union(oset2)
        expect(oset3.size()).to.be.a("number").and.to.be.equal(3)
        var oset4 = oset1.intersection(oset2)
        expect(oset4.size()).to.be.a("number").and.to.be.equal(1)
        var oset5 = oset1.difference(oset2)
        expect(oset5.size()).to.be.a("number").and.to.be.equal(1)
    })
    it("should have the expected sort functionality", function () {
        var oset = new OSet()
        oset.add("c")
        oset.add("d")
        oset.add("b")
        oset.add("a")
        oset.sort()
        expect(oset.values()).to.be.deep.equal([ "a", "b", "c", "d" ])
    })
})

