import fs from 'fs'
import assert from 'assert';

class PasswordLine {
    lower: number
    upper: number
    char: string
    password: string

    constructor(line: string) {
        const parts = line.split(" ")
        const nums = parts[0].split("-")
        this.lower = parseInt(nums[0])
        this.upper = parseInt(nums[1])
        this.char = parts[1].charAt(0)
        this.password = parts[2]
    }
}

const parse = (input: string): PasswordLine[] =>
    input.split('\n').map(value => new PasswordLine(value))

const part1 = function(passwordLines: PasswordLine[]): number {
    let count = 0
    for (const pw of passwordLines) {
        const numOfCharInStr = pw.password.split("")
            .filter(value => value === pw.char)
            .length
        if (numOfCharInStr >= pw.lower && numOfCharInStr <= pw.upper) {
            count++
        }
    }
    return count
}

const part2 = function(passwordLines: PasswordLine[]): number {
    let count = 0
    for (const pw of passwordLines) {
        if ((pw.password.charAt(pw.lower - 1) === pw.char ||
            pw.password.charAt(pw.upper - 1) === pw.char) &&
            pw.password.charAt(pw.lower - 1) !== pw.password.charAt(pw.upper - 1)) {
            count++
        }
    }
    return count
}

describe('Advent of Code 2020 Day 2', () => {
    it('Part 1 sample', () => {
        const actual = part1(parse("1-3 a: abcde\n" +
            "1-3 b: cdefg\n" +
            "2-9 c: ccccccccc"))
        assert.strictEqual(actual, 2)
    })
    it('Part 1', () => {
        const actual = part1(parse(fs.readFileSync("files/aoc2020/day2.txt", 'utf8')))
        assert.strictEqual(actual, 536)
    })
    it('Part 2 sample', () => {
        const actual = part2(parse("1-3 a: abcde\n" +
            "1-3 b: cdefg\n" +
            "2-9 c: ccccccccc"))
        assert.strictEqual(actual, 1)
    })
    it('Part 2', () => {
        const actual = part2(parse(fs.readFileSync("files/aoc2020/day2.txt", 'utf8')))
        assert.strictEqual(actual, 558)
    })
})