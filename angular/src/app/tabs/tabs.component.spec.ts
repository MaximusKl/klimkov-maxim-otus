import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabsComponent } from './tabs.component'
import { RouterLinkWithHref } from '@angular/router'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'

describe('TabsComponent', () => {
	let component: TabsComponent
	let fixture: ComponentFixture<TabsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TabsComponent],
			imports: [RouterTestingModule],
		}).compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(TabsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('should have 3 routes', () => {
		const des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))

		expect(des.length).toBe(3)
	})

	it('should have route to [recent]', () => {
		const des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))

		let index = des.findIndex(el => el.properties['href'] === '/recent')
		expect(index).toBeGreaterThan(-1)
	})

	it('should have route to [go]', () => {
		const des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))

		let index = des.findIndex(el => el.properties['href'] === '/go')
		expect(index).toBeGreaterThan(-1)
	})

	it('should have route to [settings]', () => {
		const des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))

		let index = des.findIndex(el => el.properties['href'] === '/settings')
		expect(index).toBeGreaterThan(-1)
	})
})
