import fs from 'fs'
import assert from 'assert';

const binarySearch = <T>(arr: T[], findMe: T, comparator: (v1: T, v2: T) => number): number => {
    let low = 0;
    let high = arr.length;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const element = comparator(arr[mid], findMe);
        if (element === 0) {
            return mid
        }
        if (element < 0) {
            low = mid + 1
        } else if (0 < element) {
            high = mid
        }
    }
    return -1
};

const intComparator = (v1: number, v2: number) => v1 - v2

const file = fs.readFileSync('files/aoc2020/day1.txt', 'utf8')
const nums = file.split("\n").map(value => parseInt(value)).sort(intComparator)

const part1 = function(nums: number[], total: number): number {
    for (const num of nums) {
        if (binarySearch(nums, total - num, intComparator) != -1) {
            return num * (total - num)
        }
    }
    return -1
}
console.log(`part1=${part1(nums, 2020)}`)

const part2 = function(nums: number[], total: number): number {
    for (let i = 0; i < nums.length; i++) {
        const a = nums[i]
        if (a >= total / 3) {
            break
        }
        const diff = total - a
        for (let j = i + 1; j < nums.length; j++) {
            const b = nums[j]
            const rest = diff - b
            if (b >= diff / 2 || rest < b) {
                break
            }
            if (binarySearch(nums, rest, intComparator) != -1) {
                return a * b * rest
            }
        }
    }
    return -1
}
console.log(`part2=${part2(nums, 2020)}`)

describe('Advent of Code 2020 Day 1', () => {
    it('sample product of two nums sum to 2020', () => {
        const input = "1721\n" +
            "979\n" +
            "366\n" +
            "299\n" +
            "675\n" +
            "1456"
        const sortedNums = input.split("\n")
            .map(value => parseInt(value))
            .sort(intComparator)
        assert.strictEqual(part1(sortedNums, 2020), 1721 * 299)
    })
    it('product of the two nums in file list that sum to 2020', () => {
        const actual = part1(nums, 2020)
        const expected = 1013211
        assert.strictEqual(actual, expected)
    })
    it('sample product of three nums sum to 2020', () => {
        const input = "1721\n" +
            "979\n" +
            "366\n" +
            "299\n" +
            "675\n" +
            "1456"
        const sortedNums = input.split("\n")
            .map(value => parseInt(value))
            .sort(intComparator)
        assert.strictEqual(part2(sortedNums, 2020), 366 * 675 * 979)
    })
    it('product of the three nums in file list that sum to 2020', () => {
        const actual = part2(nums, 2020)
        const expected = 13891280
        assert.strictEqual(actual, expected)
    })
})
