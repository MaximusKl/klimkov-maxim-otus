import { TestBed } from '@angular/core/testing'

import { TranslateDirectionService } from './translate-direction.service'

describe('TranslateDirectionService', () => {
	let service: TranslateDirectionService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(TranslateDirectionService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return current language code', () => {
		service.translateDirection = 'en'
		expect(service.getCurrentCode()).toBe('ru|en')
	})

	it('should return current language text', () => {
		service.translateDirection = 'en'
		expect(service.getTranslateDirectionText()).toBe('английские')
	})

	it('should return array of languages', () => {
		service.translateDirection = 'en'
		const arr = service.toArray()
		expect(arr.length).toBe(2)
		expect(arr[0].direction).toBe('en')
	})
})
