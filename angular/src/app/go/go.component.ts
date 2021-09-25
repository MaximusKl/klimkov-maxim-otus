import { Component } from '@angular/core'
import { IPairForStore, WordsStoreService } from '../words-store.service'
import { SettingsService } from '../settings.service'
import { interval } from 'rxjs'

@Component({
    selector: 'app-go',
    templateUrl: './go.component.html',
    styleUrls: ['./go.component.scss'],
})
export class GoComponent {
    started: boolean = false
    currentWordIndex: number = 0
    testWords: IPairForStore[] = []
    inputWord: string = ''
    secondsLeft: number = 0

    constructor (private wordsStore: WordsStoreService, private settings: SettingsService) {}

    // начинает упражнение. Внутри создаёт стрим из интервала для проверки оставшегося времени на упражнение
    start () {
        const arr = this.wordsStore.getPairsForLang()

        // проверка
        if (arr.length < this.settings.settings.goWordsCount) {
            alert(`Слов в словаре меньше, чем количество слов для упражнения!`)
            return
        }

        // Отобрать слова
        const numberToDelete = arr.length - this.settings.settings.goWordsCount
        for (let i = 0; i < numberToDelete; i++) {
            const randIndex = Math.random() * arr.length
            arr.splice(randIndex, 1)
        }

        this.currentWordIndex = 0
        this.testWords = arr
        this.secondsLeft = this.settings.settings.goTime * 60
        const testTimerSubs = interval(1000).subscribe(() => {
            // Если тест уже завершён
            if (!this.started) {
                testTimerSubs.unsubscribe()
                return
            }

            this.secondsLeft--
            if (this.secondsLeft < 0) {
                alert('Тест провален!')
                this.started = false
                testTimerSubs.unsubscribe()
            }
        })
        this.started = true
    }

    // Проверка слова и вывод следующего
    checkWord () {
        const currWord = this.testWords[this.currentWordIndex].translatedWord
        if (currWord === this.inputWord) {
            alert('Правильно!')
        } else {
            alert(`Неправильно, слово переводится как "${currWord}"`)
        }

        this.inputWord = ''

        this.currentWordIndex++
        if (this.currentWordIndex >= this.testWords.length) {
            this.started = false
            alert('Тест окончен')
        }
    }

    // вызывает перевод текста по нажатию `Enter` на инпуте
    keyPress (e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.checkWord()
        }
    }

    // возвращает количество оставшихся минут для вывода в форме
    getMinutesLeft () {
        return Math.floor(this.secondsLeft / 60)
    }
}
