import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecentComponent } from './recent.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

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
})
