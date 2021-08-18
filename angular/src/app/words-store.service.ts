import { Injectable } from '@angular/core'

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
	private _storedPairs: IPairForStore[] = [] // Массив слов (последних)

	constructor() {}

	// Возвращает сохранённые пары слов
	get storedPairs(): IPairForStore[] {
		return this._storedPairs
	}

	// Приватная функция для сохранения массива слов в localStorage
	private storePairs(): void {
		localStorage.setItem(storePrefix + 'Pairs', JSON.stringify(this._storedPairs))
	}

	// Загружает пары слов из localStorage
	loadPairs(): void {
		const pairs = localStorage.getItem(storePrefix + 'Pairs')
		if (pairs) {
			this._storedPairs = JSON.parse(pairs) as IPairForStore[]
		}
	}

	// Сохраняет пару слов в массив недавних слов и записывает обновлённый массив в localStorage
	savePair(originalWord: string, translatedWord: string, translateDirection: string): void {
		const newPair: IPairForStore = {
			originalWord: originalWord.toLowerCase(),
			translatedWord: translatedWord.toLowerCase(),
			translateDirection,
		}

		// const exists = this._storedPairs.find(value => value.originalWord === newPair.originalWord)
		// if (!exists) {
		this._storedPairs.push(newPair) // TODO Может, использовать unshift?
		this.storePairs()
		// }
	}
}
