import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TranslateDirection } from './app.component'
import { Observable } from 'rxjs'

const API_KEY = '2080435c28d0ea86707b'
const email = 'mklimkov@list.ru' // Для 10000 слов в день

@Injectable({
	providedIn: 'root',
})
export class TranslateWordService {
	constructor(private http: HttpClient) {}

	// функция перевода слова (вызов API внешнего ресурса)
	translate(word: string, direction: TranslateDirection): Observable<any> {
		const url = `https://api.mymemory.translated.net/get?q=${word}&langpair=${direction}&key=${API_KEY}&de=${email}`
		return this.http.get<any>(url) // any используем, чтобы не ругалось на <Object>
	}
}
