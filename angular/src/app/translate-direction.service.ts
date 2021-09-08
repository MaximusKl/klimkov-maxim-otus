import { Injectable } from '@angular/core'

const translateDirectionPrefix: string = 'WordTranslateAppTranslateDirection'

export const EN = 'en'
export const ES = 'es'

export interface ITranslateDirection {
	direction: string
	code: string
	strForHeader: string
	strForSettings: string
}

@Injectable({
	providedIn: 'root',
})
export class TranslateDirectionService {
	private directions = new Map<string, ITranslateDirection>()
	private _translateDirection: string = EN // текущее направление перевода

	constructor() {
		this.directions.set(EN, { direction: EN, code: 'ru|en', strForHeader: 'английские', strForSettings: 'английский' })
		this.directions.set(ES, { direction: ES, code: 'ru|es', strForHeader: 'испанские', strForSettings: 'испанский' })

		const dir = localStorage.getItem(translateDirectionPrefix)
		if (dir) this._translateDirection = dir
	}

	get translateDirection(): string {
		return this._translateDirection
	}

	set translateDirection(value: string) {
		this._translateDirection = value
		localStorage.setItem(translateDirectionPrefix, this._translateDirection)
	}

	// Возвращает код текущего языка для сервиса перевода
	getCurrentCode(): string {
		const dir = this.directions.get(this._translateDirection)
		if (dir) return dir.code
		return ''
	}

	// Возвращает текстовое представление языка для вывода в заголовке приложения
	getTranslateDirectionText(): string {
		const dir = this.directions.get(this._translateDirection)
		if (dir) {
			return dir.strForHeader
		}

		return 'неизвестные'
	}

	// Возвращает массив значений из Map
	toArray(): ITranslateDirection[] {
		return Array.from(this.directions.values())
	}
}
