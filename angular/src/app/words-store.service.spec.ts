import { TestBed } from '@angular/core/testing'

import { IPairForStore, WordsStoreService } from './words-store.service'

describe('WordsStoreService', () => {
	let service: WordsStoreService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(WordsStoreService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should add pair', () => {
		service.savePair('original', 'translated', 'ru|en')
		expect(service.storedPairs.length).toBe(1)
	})

	it('should add pairs with unshift', () => {
		service.savePair('original1', 'translated1', 'ru|en')
		service.savePair('original2', 'translated2', 'ru|en')
		expect(service.storedPairs.length).toBe(2)
		expect(service.storedPairs[0].originalWord).toBe('original2')
	})

	it('should remove pair', () => {
		service.savePair('original1', 'translated1', 'ru|en')
		service.savePair('original2', 'translated2', 'ru|en')
		const pairToRemove: IPairForStore = {
			originalWord: 'original1',
			translatedWord: '',
			translateDirection: 'ru|en',
		}
		service.removePair(pairToRemove)
		expect(service.storedPairs.length).toBe(1)
		expect(service.storedPairs[0].originalWord).toBe('original2')
	})

	// Тут не совсем корректный тест, поскольку этот сервис использует сервис с выбранным текущим языком.
	it('should return pairs for specified language', () => {
		service.savePair('original1', 'translated1', 'ru|en')
		service.savePair('original2', 'translated2', 'ru|es')
		service.savePair('original3', 'translated3', 'ru|en')
		expect(service.storedPairs.length).toBe(3)
		expect(service.getPairsForLang().length).toBe(2)
	})
})
