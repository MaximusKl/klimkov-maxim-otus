import { Injectable } from '@angular/core'

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
	// private directions: Map<string, ITranslateDirection>
	private directions = new Map<string, ITranslateDirection>()
	private _translateDirection: string = EN // TranslateDirection.en // текущее направление перевода

	constructor() {
		this.directions.set(EN, { direction: EN, code: 'ru|en', strForHeader: 'английские', strForSettings: 'английский' })
		this.directions.set(ES, { direction: ES, code: 'ru|es', strForHeader: 'испанские', strForSettings: 'испанский' })
	}

	get translateDirection(): string {
		return this._translateDirection
	}

	set translateDirection(value: string) {
		this._translateDirection = value
	}

	getCurrentCode(): string {
		const dir = this.directions.get(this._translateDirection)
		if (dir) return dir.code
		return ''
	}

	getTranslateDirectionText(): string {
		const dir = this.directions.get(this._translateDirection)
		if (dir) {
			return dir.strForHeader
		}

		return 'неизвестные'
	}

	toArray(): ITranslateDirection[] {
		return Array.from(this.directions.values())
	}
}
