import { Injectable } from '@angular/core'
import { TranslateDirectionService } from './translate-direction.service'

const storePrefix: string = 'WordTranslateApp'

export interface IPairForStore {
	originalWord: string
	translatedWord: string
	translateDirection: string
}

@Injectable({
	providedIn: 'root',
})
export class WordsStoreService {
	storedPairs: IPairForStore[] = [] // Массив слов (последних)

	constructor(private translateDirection: TranslateDirectionService) {}

	// Возвращает сохранённые пары слов
	// get storedPairs(): IPairForStore[] {
	// 	return this._storedPairs
	// }

	getPairsForLang() {
		return this.storedPairs.filter(pair => pair.translateDirection === this.translateDirection.getCurrentCode())
	}

	// Приватная функция для сохранения массива слов в localStorage
	private storePairs(): void {
		localStorage.setItem(storePrefix + 'Pairs', JSON.stringify(this.storedPairs))
	}

	// Загружает пары слов из localStorage
	loadPairs(): void {
		const pairs = localStorage.getItem(storePrefix + 'Pairs')
		if (pairs) {
			this.storedPairs = JSON.parse(pairs) as IPairForStore[]
		}
	}

	// Сохраняет пару слов в массив недавних слов и записывает обновлённый массив в localStorage
	savePair(originalWord: string, translatedWord: string, translateDirection: string): void {
		const newPair: IPairForStore = {
			originalWord: originalWord.toLowerCase(),
			translatedWord: translatedWord.toLowerCase(),
			translateDirection,
		}

		this.storedPairs.unshift(newPair)
		this.storePairs()
	}
}
