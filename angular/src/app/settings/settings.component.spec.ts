import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SettingsComponent } from './settings.component'
import { By } from '@angular/platform-browser'

describe('SettingsComponent', () => {
	let component: SettingsComponent
	let fixture: ComponentFixture<SettingsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SettingsComponent],
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should create 3 selects', () => {
		const de = fixture.debugElement.queryAll(By.css('select'))

		expect(de.length).toBe(3)
	})

	it('should create 3 settings divs', () => {
		const lang = fixture.debugElement.query(By.css('.settings__translate-lang'))
		const wc = fixture.debugElement.query(By.css('.settings__words-count'))
		const time = fixture.debugElement.query(By.css('.settings__time'))

		expect(lang.nativeElement).toBeTruthy()
		expect(wc.nativeElement).toBeTruthy()
		expect(time.nativeElement).toBeTruthy()
	})
})
