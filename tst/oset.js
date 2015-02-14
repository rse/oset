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

/* global describe: false */
/* global it: false */
/* global expect: false */
/* global require: false */
/* jshint -W030: false */

var OSet = require("../lib/oset.js");

describe("OSet Library", function () {
    it("should expose its official API", function () {
        var oset = new OSet();
        expect(oset).to.be.a("object")
        expect(oset).to.respondTo("length")
        expect(oset).to.respondTo("keys")
        expect(oset).to.respondTo("values")
        expect(oset).to.respondTo("find")
        expect(oset).to.respondTo("each")
        expect(oset).to.respondTo("has")
        expect(oset).to.respondTo("get")
        expect(oset).to.respondTo("set")
        expect(oset).to.respondTo("del")
        expect(oset).to.respondTo("clear")
        expect(oset).to.respondTo("merge")
        expect(oset).to.respondTo("union")
        expect(oset).to.respondTo("intersection")
        expect(oset).to.respondTo("difference")
    })
    it("should have the expected has/set/get/del functionality", function () {
        var oset = new OSet();
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.false
        oset.set("foo", true);
        oset.set("bar", "baz");
        oset.set("quux", 42);
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.true
        expect(oset.get("foo")).to.be.a("boolean").and.to.be.true
        expect(oset.get("bar")).to.be.a("string").and.to.be.equal("baz")
        expect(oset.get("quux")).to.be.a("number").and.to.be.equal(42)
        oset.del("foo");
        expect(oset.has("foo")).to.be.a("boolean").and.to.be.false
        expect(oset.get("foo")).to.be.equal(undefined)
    })
    it("should have the expected length/keys/values/find/each/clear functionality", function () {
        var oset = new OSet();
        expect(oset.length()).to.be.a("number").and.to.be.equal(0)
        oset.set("foo", true);
        oset.set("bar", "val1");
        oset.set("baz", "val2");
        oset.set("quux", 42);
        expect(oset.length()).to.be.a("number").and.to.be.equal(4)
        expect(oset.keys()).to.be.deep.equal([ "foo", "bar", "baz", "quux" ])
        expect(oset.values()).to.be.deep.equal([ true, "val1", "val2", 42 ])
        expect(oset.find(function (val /*, key */) { return (typeof val === "string") })).to.be.deep.equal([ "val1", "val2" ])
        /* each is already indirectly tested here */
        oset.clear()
        expect(oset.length()).to.be.a("number").and.to.be.equal(0)
    })
    it("should have the expected merge/union/intersection/difference functionality", function () {
        var oset1 = new OSet();
        var oset2 = new OSet();
        oset1.set("foo", "bar")
        oset2.set("baz", "quux")
        expect(oset1.length()).to.be.a("number").and.to.be.equal(1)
        expect(oset2.length()).to.be.a("number").and.to.be.equal(1)
        oset1.merge(oset2)
        expect(oset1.length()).to.be.a("number").and.to.be.equal(2)
        expect(oset2.length()).to.be.a("number").and.to.be.equal(0)
        oset2.set("baz", "quux")
        oset2.set("quux", "quux")
        var oset3 = oset1.union(oset2)
        expect(oset3.length()).to.be.a("number").and.to.be.equal(3)
        var oset4 = oset1.intersection(oset2)
        expect(oset4.length()).to.be.a("number").and.to.be.equal(1)
        var oset5 = oset1.difference(oset2)
        expect(oset5.length()).to.be.a("number").and.to.be.equal(1)
    })
})

