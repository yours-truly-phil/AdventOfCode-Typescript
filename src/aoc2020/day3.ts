import assert from 'assert';
import * as fs from 'fs';

const part1 = function(map: string): number {
    const lines = map.split('\n')
    let x = 0
    let count = 0
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i]
        x = (x + 3) % row.length
        if (row[x] === '#') {
            count++
        }
    }
    return count
}

const part2 = function(map: string): number {
    const actors = [new Actor(1, 1), new Actor(3, 1),
        new Actor(5, 1), new Actor(7, 1), new Actor(1, 2)]
    const lines = map.split('\n')
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        for (const a of actors) {
            if (i % a.y === 0) {
                a.pos = (a.pos + a.x) % line.length
                if (line[a.pos] === '#') {
                    a.count++
                }
            }
        }
    }
    return actors
        .map(value => value.count)
        .reduce((acc, num) => acc * num)
}

class Actor {
    x: number
    y: number
    count = 0
    pos = 0

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

describe('AoC 2020 Day 3', () => {
    it('Part 1 sample', () => {
        assert.strictEqual(part1("..##.......\n" +
            "#...#...#..\n" +
            ".#....#..#.\n" +
            "..#.#...#.#\n" +
            ".#...##..#.\n" +
            "..#.##.....\n" +
            ".#.#.#....#\n" +
            ".#........#\n" +
            "#.##...#...\n" +
            "#...##....#\n" +
            ".#..#...#.#"), 7)
    })
    it('Part 1', () => {
        assert.strictEqual(part1(fs.readFileSync('files/aoc2020/day3.txt', 'utf8')),
            240)
    })
    it('Part 2 sample', () => {
        assert.strictEqual(part2("..##.......\n" +
            "#...#...#..\n" +
            ".#....#..#.\n" +
            "..#.#...#.#\n" +
            ".#...##..#.\n" +
            "..#.##.....\n" +
            ".#.#.#....#\n" +
            ".#........#\n" +
            "#.##...#...\n" +
            "#...##....#\n" +
            ".#..#...#.#"), 336)
    })
    it('Part 2', () => {
        assert.strictEqual(part2(fs.readFileSync('files/aoc2020/day3.txt', 'utf8')),
            2832009600)
    })
})