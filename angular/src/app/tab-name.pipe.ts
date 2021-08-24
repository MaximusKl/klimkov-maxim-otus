import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'tabName',
})
export class TabNamePipe implements PipeTransform {
	transform(value: string): string {
		switch (value) {
			case 'recent':
				return 'недавние'
			case 'go':
				return 'упражнение'
			case 'settings':
				return 'настройки'
		}
		return ''
	}
}
