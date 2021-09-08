import { Component } from '@angular/core'
import { TextTranslateAndStoreService } from '../text-translate-and-store.service'
import { TranslateDirectionService } from '../translate-direction.service'
import { WordsStoreService } from '../words-store.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-recent',
	templateUrl: './recent.component.html',
	styleUrls: ['./recent.component.scss'],
})
export class RecentComponent {
	text: string = ''
	sub?: Subscription

	constructor(
		public storeWords: WordsStoreService,
		private translateService: TextTranslateAndStoreService,
		private translateDirection: TranslateDirectionService
	) {}

	// функция вызывает стрим перевода текста и подписывается на результаты
	translate() {
		this.sub = this.translateService.translateText(this.text, this.translateDirection.getCurrentCode()).subscribe(
			value => {
				if (value.responseStatus === 200) {
					const resultWord = value.responseData.translatedText
					this.storeWords.savePair(value.matches[0].segment, resultWord, this.translateDirection.getCurrentCode())
				}
			},
			error => {
				alert('Ошибка! \n' + error.message)
				if (this.sub) this.sub.unsubscribe()
			},
			() => {
				if (this.sub) this.sub.unsubscribe()
				this.text = ''
			}
		)
	}

	// вызывает перевод текста по нажатию `Enter` на инпуте
	keyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.translate()
		}
	}
}
