import { Injectable } from '@angular/core'

const settingsPrefix: string = 'WordTranslateAppSettings'

interface ISettings {
	goWordsCount: number
	goTime: number
}

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	TimeOptions = [5, 10, 15, 20]
	WordsCountOptions = [5, 10, 20, 30]

	settings: ISettings = { goTime: this.TimeOptions[0], goWordsCount: this.WordsCountOptions[0] }

	loadSettings() {
		const settings = localStorage.getItem(settingsPrefix)
		if (settings) {
			this.settings = JSON.parse(settings)
		}
	}

	storeSettings() {
		localStorage.setItem(settingsPrefix, JSON.stringify(this.settings))
	}
}
