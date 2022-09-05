import { Component } from '@angular/core'
import { TextTranslateAndStoreService } from '../text-translate-and-store.service'
import { TranslateDirectionService } from '../translate-direction.service'
import { WordsStoreService } from '../words-store.service'

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.scss'],
})
export class RecentComponent {
	text: string = ''

	constructor(
		public storeWords: WordsStoreService,
		private translateService: TextTranslateAndStoreService,
		private translateDirection: TranslateDirectionService
	) {}

	translate() {
		this.translateService.translateText(this.text, this.translateDirection.getCurrentCode()).subscribe(
			value => {
				if (value.responseStatus === 200) {
					const resultWord = value.responseData.translatedText
					this.storeWords.savePair(value.matches[0].segment, resultWord, this.translateDirection.getCurrentCode())
				}
			},
			error => {
				alert('Ошибка! \n' + error.message)
				return
			}
		)
		this.text = ''
	}

	keyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.translate()
		}
	}
}
