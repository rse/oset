/*
**  OMap -- Ordered Set Data Structure
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

/* global describe: false */
/* global it: false */
/* global expect: false */
/* global require: false */
/* jshint -W030: false */

var OMap = require("../lib/oset.js").OMap

describe("OMap Data Structure", function () {
    it("should expose its official API", function () {
        var omap = new OMap()
        expect(omap).to.be.a("object")
        expect(omap).to.respondTo("size")
        expect(omap).to.respondTo("keys")
        expect(omap).to.respondTo("values")
        expect(omap).to.respondTo("find")
        expect(omap).to.respondTo("each")
        expect(omap).to.respondTo("has")
        expect(omap).to.respondTo("get")
        expect(omap).to.respondTo("set")
        expect(omap).to.respondTo("del")
        expect(omap).to.respondTo("clear")
        expect(omap).to.respondTo("merge")
        expect(omap).to.respondTo("union")
        expect(omap).to.respondTo("intersection")
        expect(omap).to.respondTo("difference")
    })
    it("should have the expected has/set/get/del functionality", function () {
        var omap = new OMap()
        expect(omap.has("foo")).to.be.a("boolean").and.to.be.false
        omap.set("foo", true)
        omap.set("bar", "baz")
        omap.set("quux", 42)
        expect(omap.has("foo")).to.be.a("boolean").and.to.be.true
        expect(omap.get("foo")).to.be.a("boolean").and.to.be.true
        expect(omap.get("bar")).to.be.a("string").and.to.be.equal("baz")
        expect(omap.get("quux")).to.be.a("number").and.to.be.equal(42)
        omap.del("foo")
        expect(omap.has("foo")).to.be.a("boolean").and.to.be.false
        expect(omap.get("foo")).to.be.equal(undefined)
    })
    it("should be correctly preserve the insertion order", function () {
        var omap = new OMap()
        omap.set("item2", "item2")
        omap.set("item3", "item3")
        omap.set("item1", "item1", true)
        omap.set("item0", "item0", true)
        expect(omap.keys()).to.be.deep.equal([ "item0", "item1", "item2", "item3" ])
        expect(omap.values()).to.be.deep.equal([ "item0", "item1", "item2", "item3" ])
    })
    it("should have the expected size/keys/values/find/each/clear functionality", function () {
        var omap = new OMap()
        expect(omap.size()).to.be.a("number").and.to.be.equal(0)
        omap.set("foo", true)
        omap.set("bar", "val1")
        omap.set("baz", "val2")
        omap.set("quux", 42)
        expect(omap.size()).to.be.a("number").and.to.be.equal(4)
        expect(omap.keys()).to.be.deep.equal([ "foo", "bar", "baz", "quux" ])
        expect(omap.values()).to.be.deep.equal([ true, "val1", "val2", 42 ])
        expect(omap.find(function (val /*, key */) { return (typeof val === "string") })).to.be.deep.equal([ "val1", "val2" ])
        /* each is already indirectly tested here */
        omap.clear()
        expect(omap.size()).to.be.a("number").and.to.be.equal(0)
    })
    it("should have the expected merge/union/intersection/difference functionality", function () {
        var omap1 = new OMap()
        var omap2 = new OMap()
        omap1.set("foo", "bar")
        omap2.set("baz", "quux")
        expect(omap1.size()).to.be.a("number").and.to.be.equal(1)
        expect(omap2.size()).to.be.a("number").and.to.be.equal(1)
        omap1.merge(omap2)
        expect(omap1.size()).to.be.a("number").and.to.be.equal(2)
        expect(omap2.size()).to.be.a("number").and.to.be.equal(0)
        omap2.set("baz", "quux")
        omap2.set("quux", "quux")
        var omap3 = omap1.union(omap2)
        expect(omap3.size()).to.be.a("number").and.to.be.equal(3)
        var omap4 = omap1.intersection(omap2)
        expect(omap4.size()).to.be.a("number").and.to.be.equal(1)
        var omap5 = omap1.difference(omap2)
        expect(omap5.size()).to.be.a("number").and.to.be.equal(1)
    })
    it("should have the expected sort functionality", function () {
        var omap = new OMap()
        omap.set("c", true)
        omap.set("d", true)
        omap.set("b", true)
        omap.set("a", true)
        omap.sort()
        expect(omap.keys()).to.be.deep.equal([ "a", "b", "c", "d" ])
    })
})

