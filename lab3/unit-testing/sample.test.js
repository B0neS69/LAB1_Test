import * as util from './sample.js'

describe('Add function', () => {
    test('should get 3 as result of adding 1 and 2', () => {
        expect(util.add(1, 2)).toBe(3)
    })
})