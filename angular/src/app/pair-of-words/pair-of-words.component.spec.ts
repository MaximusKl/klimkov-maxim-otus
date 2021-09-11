import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PairOfWordsComponent } from './pair-of-words.component'
import { By } from '@angular/platform-browser'

describe('PairOfWordsComponent', () => {
	let component: PairOfWordsComponent
	let fixture: ComponentFixture<PairOfWordsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PairOfWordsComponent],
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(PairOfWordsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should create div', () => {
		const word = fixture.debugElement.query(By.css('.pair__words'))

		expect(word.nativeElement).toBeTruthy()
	})

	it('should create remove button', () => {
		const button = fixture.debugElement.query(By.css('button.pair__button'))

		// button.triggerEventHandler('click', null)
		expect(button.nativeElement).toBeTruthy()
	})
})
