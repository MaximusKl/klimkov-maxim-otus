import { Component, OnInit } from '@angular/core'
import { WordsStoreService } from './words-store.service'
import { EN, TranslateDirectionService } from './translate-direction.service'
import { SettingsService } from './settings.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		public storeWords: WordsStoreService,
		public translateDirection: TranslateDirectionService,
		private settings: SettingsService
	) {}

	ngOnInit(): void {
		this.storeWords.loadPairs()
		this.settings.loadSettings()

		this.translateDirection.translateDirection = EN
	}
}
