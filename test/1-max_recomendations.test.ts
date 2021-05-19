import { maxItemAssociation } from '../src/1-max_recomendations'

describe('test maxItemAssociation function', () => {
	it('should return ["a", "b", "c", "f"] for [["a", "b"],["b", "c"],["d", "e"],["f", "c"]]', () => {
		expect(
			maxItemAssociation([
				['a', 'b'],
				['b', 'c'],
				['d', 'e'],
				['f', 'c'],
			])
		).toStrictEqual(['a', 'b', 'c', 'f'])
	})
	it('should return ["a", "b", "c"] for [["a", "b"],["a", "c"],["d", "e"]]', () => {
		expect(
			maxItemAssociation([
				['a', 'b'],
				['a', 'c'],
				['d', 'e'],
			])
		).toStrictEqual(['a', 'b', 'c'])
	})
})
