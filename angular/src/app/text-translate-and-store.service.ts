import { Injectable } from '@angular/core'
import { TranslateWordService } from './translate-word.service'
import { WordsStoreService } from './words-store.service'
import { from, Observable, throwError } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root',
})
export class TextTranslateAndStoreService {
	constructor(private translateWord: TranslateWordService, private wordsStore: WordsStoreService) {}

	// разбивает текст на слова и переводит каждое слово
	translateText(text: string, direction: string): Observable<any> {
		// Разбить текст на слова
		const words = text
			.trim()
			.split(/[.,\/\\ *+-:;?!"'`|(){}\[\]<>_=]/)
			.filter(word => word)

		if (!words.length) {
			return throwError(new Error('Введены неверные слова!'))
		}

		return from(words).pipe(
			filter(word => {
				if (
					this.wordsStore.storedPairs.find(
						value => value.originalWord === word.toLowerCase() && value.translateDirection === direction
					)
				) {
					// TODO Здесь можно что-то сделать со списком недавних слов, например переместить слово вверх списка
					return false
				} else return true
			}),
			// switchMap(word => this.translateWord.translate(word, direction))
			mergeMap(word => this.translateWord.translate(word, direction))
		)
	}
}
