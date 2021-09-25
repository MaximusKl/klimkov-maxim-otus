import { Component, Input } from '@angular/core'
import { IPairForStore, WordsStoreService } from '../words-store.service'

@Component({
	selector: 'app-pair-of-words',
	templateUrl: './pair-of-words.component.html',
	styleUrls: ['./pair-of-words.component.scss'],
})
export class PairOfWordsComponent {
	@Input() pair: IPairForStore = { originalWord: '', translatedWord: '', translateDirection: '' }

	constructor(private wordsStore: WordsStoreService) {}

	remove() {
		if (confirm(`Удалить слово "${this.pair.originalWord}"?`)) this.wordsStore.removePair(this.pair)
	}
}
