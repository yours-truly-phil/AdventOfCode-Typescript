import { greet } from '../src/greet';
import * as assert from 'assert';

describe('greet', () => {
    it('should return a greeting statement', () => {
        const actual: string = greet('Phil')
        const expected: string = 'Hello, Phil!'

        assert.strictEqual(actual, expected)
    })
})