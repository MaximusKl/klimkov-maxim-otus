import { Pair } from './types'

// Задача - найти максимальную группу ассоциаций.

// На входе - массив пар ассоциаций.
// На выходе - массив наибольшей группы ассоциаций
// или первой группы в лексикографическом порядке, если длина групп одинакова.

// Идея - пары объединяются в группы, если в них есть одинаковые элементы
// Делаем несколько проходов по массиву групп до тех пор, пока не будет найдено ни одного совпадающего элемента
export function maxItemAssociation(inputArray: Array<Pair>): string[] {
	// делаем копию исходного массива для создания групп ассоциаций
	let associationArray: Array<string[]> = Array.from(inputArray)

	// делам проходы по массиву до тех пор, пока находятся совпадающие элементы
	while (processAssociations(associationArray)) {}

	// отсортируем массивы по длине группы ассоциаций
	associationArray.sort((a: string[], b: string[]) => {
		const comp = b.length - a.length
		// если элементы разные по длине, возвращаем разницу
		if (comp !== 0) return comp

		// если длина элементов равна, сравниваем по лексиграфическому признаку
		if (a[0] < b[0]) return -1
		if (a[0] > b[0]) return 1
		return 0
	})

	return associationArray[0]
}

// На входе - массив групп ассоциаций.
// Функция делает проход по массиву, ищет совпадающие элементы и объединяет группы.
//
// Поиск происходит до первого совпадения.
// Если сопадение есть, группы с совпадающими элементами объединяются и возвращается true.
// Если сопадений не найдено, возвращается false.
function processAssociations(arr: Array<string[]>): boolean {
	// внешний цикл по элементам массива
	for (let i = 0; i < arr.length - 1; i++) {
		// внутренний цикл по другим элементам массива
		for (let j = i + 1; j < arr.length; j++) {
			// Если есть совпадающие элементы
			const foundElement = hasEqualElements(arr[i], arr[j])
			if (foundElement) {
				// объединить найденные группы
				arr[i] = [...arr[i], ...arr[j]]
				// удалим повторяющиеся элементы
				arr[i] = arr[i].filter((item, idx) => arr[i].indexOf(item) === idx)
				// удаляем из масиива вторую группу
				arr.splice(j, 1)
				return true
			}
		}
	}
	return false
}

// На входе 2 массива. Функция определяет, есть ли в массиве одинаковые элементы.
function hasEqualElements(arr1: string[], arr2: string[]): boolean {
	for (let i = 0; i < arr1.length; i++) {
		const arr2element = arr2.find(el => el === arr1[i])
		if (arr2element) return true
	}
	return false
}
