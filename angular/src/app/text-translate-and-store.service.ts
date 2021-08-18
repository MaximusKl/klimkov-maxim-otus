import { Injectable } from '@angular/core'
import { TranslateWordService } from './translate-word.service'
import { WordsStoreService } from './words-store.service'
import { TranslateDirection } from './app.component'

@Injectable({
	providedIn: 'root',
})
export class TextTranslateAndStoreService {
	constructor(private translateWord: TranslateWordService, private wordsStore: WordsStoreService) {}

	// разбивает текст на слова и переводит каждое слово
	translateText(text: string, direction: TranslateDirection): void {
		// Разбить текст на слова
		const words = text.split(/[.,\/\\ *+-:;?!"'`|(){}\[\]<>_=]/).filter(word => word)

		words.forEach(word => {
			// Проверм, есть ли уже слово в словаре
			const exists = this.wordsStore.storedPairs.find(value => value.originalWord === word.toLowerCase())
			if (exists) {
				return
			}

			// Если нет - запросим перевод
			this.translateWord.translate(word, direction).subscribe(
				value => {
					// console.log(value)
					if (value.responseStatus === 200) {
						const resultWord = value.responseData.translatedText
						this.wordsStore.savePair(word, resultWord, direction)
					}
				},
				error => {
					console.log(error)
				},
				() => {
					// console.log('complete')
				}
			)
		})
	}
}
