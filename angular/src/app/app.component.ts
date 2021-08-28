import { Component, OnInit } from '@angular/core'
import { WordsStoreService } from './words-store.service'
import { EN, TranslateDirectionService } from './translate-direction.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	tabs: string[] = ['recent', 'go', 'settings']
	private _currentTab = 'recent'

	constructor(public storeWords: WordsStoreService, public translateDirection: TranslateDirectionService) {}

	get currentTab(): string {
		return this._currentTab
	}

	ngOnInit(): void {
		this.storeWords.loadPairs()

		// this._translateDirection = TranslateDirection.en
		this.translateDirection.translateDirection = EN

		// console.log(this.translateDirection.toArray())
	}

	setCurrentTab(tab: string) {
		this._currentTab = tab
	}
}
