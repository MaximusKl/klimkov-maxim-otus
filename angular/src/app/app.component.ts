import { Component, OnInit } from '@angular/core'
import { TranslateWordService } from './translate-word.service'
import { TextTranslateAndStoreService } from './text-translate-and-store.service'
import { WordsStoreService } from './words-store.service'

export enum TranslateDirection {
	RuEn = 'ru|en',
	EnRu = 'en|ru',
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	private _translateDirection: TranslateDirection = TranslateDirection.RuEn // текущее направление перевода

	resultText = ''

	constructor(
		private translateService: TranslateWordService,
		public storeWords: WordsStoreService,
		private textTranslate: TextTranslateAndStoreService
	) {}

	ngOnInit(): void {
		this.storeWords.loadPairs()

		this._translateDirection = TranslateDirection.EnRu
		// this.translateService.translate('Привет, мир!').subscribe(
		// this.translateService.translate('Hello, world!').subscribe(
		// 	value => {
		// 		// console.log(value)
		// 		this.resultText = value.responseData.translatedText
		// 		this.storeWords.savePair('Hello', 'Привет', TranslateDirection.EnRu)
		// 	},
		// 	error => {
		// 		console.log(error)
		// 	},
		// 	() => {
		// 		// console.log('complete')
		// 	}
		// )

		this.textTranslate.translateText('Hello, world!', this._translateDirection)
		// this.textTranslate.translateText('Красная-(роза)', TranslateDirection.RuEn)
	}
}
