import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecentComponent } from './recent.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { By } from '@angular/platform-browser'

describe('RecentComponent', () => {
	let component: RecentComponent
	let fixture: ComponentFixture<RecentComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			declarations: [RecentComponent],
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(RecentComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should create recent content', () => {
		const comp = fixture.debugElement.query(By.css('.recent__content'))

		expect(comp.nativeElement).toBeTruthy()
	})

	it('should create input', () => {
		const inp = fixture.debugElement.query(By.css('.recent__input-frame .recent__input input'))

		expect(inp.nativeElement).toBeTruthy()
	})

	it('should create input button', () => {
		const button = fixture.debugElement.query(By.css('.recent__input-frame button'))

		expect(button.nativeElement).toBeTruthy()
	})
})
