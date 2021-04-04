// На входе - массив пар ассоциация
// Задача - найти максимальную грппу ассоциаций
function maxItemAssociation(inputArray) {
    // как выполнить?
    // Идея - пары объединяются в группы, если в них есть одинаковые элементы
    // Делаем несколько проходов по массиву групп до тех пор, пока не будет найдено ни одного совпадающего элемента

    // делаем копию исходного массива для создания групп ассоциаций
    let associationArray = inputArray

    // внешний цикл по элем ентем массива
    for (let i = 0; i < associationArray.length - 1; i++) {
        // внутренний цикл по другим элементам массива
        for (let j = i + 1; j < associationArray.length; j++) {
            // Если есть совпадающие элементы
            if (hasEqualElements(associationArray[i], associationArray[j])) {
                // объединить найденные группы
            }
        }
    }
}

// на входе 2 массива. Функция определдяет, есть лм в массиве одинаковые элементы
function hasEqualElements(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true
            }
        }
    }

    return false
}