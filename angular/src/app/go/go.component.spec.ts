import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { GoComponent } from './go.component'
import { By } from '@angular/platform-browser'
import { WordsStoreService } from '../words-store.service'

describe('GoComponent', () => {
	let component: GoComponent
	let fixture: ComponentFixture<GoComponent>
	let wordsStoreService: WordsStoreService

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GoComponent],
			providers: [WordsStoreService],
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(GoComponent)
		component = fixture.componentInstance
		wordsStoreService = TestBed.inject(WordsStoreService)
		wordsStoreService.loadPairs()
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should create button for start test', () => {
		const button = fixture.debugElement.query(By.css('.go__begin button'))

		expect(button.nativeElement).toBeTruthy()
	})

	it('should create call start function', () => {
		const button = fixture.debugElement.query(By.css('.go__begin button'))
		const spy = spyOn(component, 'start')
		button.triggerEventHandler('click', null)

		expect(spy).toHaveBeenCalled()
	})

	xit(
		'should create status elements',
		waitForAsync(() => {
			fixture.detectChanges()

			const button = fixture.debugElement.query(By.css('.go__begin button'))
			button.triggerEventHandler('click', null)

			fixture.detectChanges()
			fixture.whenStable().then(() => {
				fixture.detectChanges()
				const timeStatus = fixture.debugElement.query(By.css('.go__time-status'))
				// const wordStatus = fixture.debugElement.query(By.css('.go__word-status'))

				expect(timeStatus).toBeTruthy()
				// expect(wordStatus.nativeElement).toBeTruthy()
			})
		})
	)
})
