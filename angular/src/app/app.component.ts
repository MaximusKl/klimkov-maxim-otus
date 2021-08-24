import { Component, OnInit } from '@angular/core'
import { WordsStoreService } from './words-store.service'

export enum TranslateDirection {
	en = 'ru|en',
	es = 'ru|es',
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	private _translateDirection: TranslateDirection = TranslateDirection.en // текущее направление перевода

	tabs: string[] = ['recent', 'go', 'settings']
	private _currentTab = 'recent'

	constructor(public storeWords: WordsStoreService) {}

	get currentTab(): string {
		return this._currentTab
	}

	ngOnInit(): void {
		this.storeWords.loadPairs()

		this._translateDirection = TranslateDirection.en
	}

	getTranslateDirectionText(): string {
		switch (this._translateDirection) {
			case TranslateDirection.en:
				return 'английские'
			case TranslateDirection.es:
				return 'испанские'
		}
		return 'неизвестные'
	}

	setCurrentTab(tab: string) {
		this._currentTab = tab
	}
}
