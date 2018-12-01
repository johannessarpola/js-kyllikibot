const timeParse = require("../../util/timeParse");
const chai = require("chai")
const should = chai.should();
const expect = chai.expect;

describe('TimeParse', () => {

    it("should parse hours from 17:00", () => {
        let time = timeParse.tryParseTime("17:00");
        time.getHours().should.equal(17);
    });

    it("should parse minutes from 17:15", () => {
        let time = timeParse.tryParseTime("17:15");
        time.getMinutes().should.equal(15);
    });

    it("should parse time from 1715", () => {
        let time = timeParse.tryParseTime("1715");
        time.getHours().should.equal(17);
        time.getMinutes().should.equal(15);
    });

    it("should parse time from 16.20", () => {
        let time = timeParse.tryParseTime("16.20");
        time.getHours().should.equal(16);
        time.getMinutes().should.equal(20);
    });

    it("should not parse time from", () => {
        let time = timeParse.tryParseTime("abc");
        should.not.exist(time)
    });

    it("should parse date from 20.2.2018", () => {
        let time = timeParse.tryParseDate("20.2.2018");
        time.getDate().should.equal(20);
        time.getMonth().should.equal(1);
        time.getFullYear().should.equal(2018);
    });

    it("should parse date from 20.02.2018", () => {
        let time = timeParse.tryParseDate("20.02.2018");
        time.getDate().should.equal(20);
        time.getMonth().should.equal(1);
        time.getFullYear().should.equal(2018);
    });

    it("should parse date from 23-03-2018", () => {
        let time = timeParse.tryParseDate("23-03-2018");
        time.getDate().should.equal(23);
        time.getMonth().should.equal(2);
        time.getFullYear().should.equal(2018);
    });

    it("should parse date from 23-3-2018", () => {
        let time = timeParse.tryParseDate("23-3-2018");
        time.getDate().should.equal(23);
        time.getMonth().should.equal(2);
        time.getFullYear().should.equal(2018);
    });

    it("should generate examples with formats", () => {
        let fmts = ["M/D/YYYY", "Hm"]
        let gens = timeParse.generateExamples(fmts);
        let date = gens.date;
        let exs = gens.examples;

        expect(exs).to.include(`${date.getHours()}${date.getMinutes()}`)
        expect(exs).to.include(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`)

    });
});