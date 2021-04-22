function getPath(el) {
    let resultStr = ''
    if (el) {
        resultStr = getParentElementPath(el, resultStr)
    }
    return resultStr.trim()
}

function getParentElementPath(el, path) {
    // Первым делом берём имя элемента
    let tag = el.nodeName
    if (!tag) {
        return path
    }
    tag = tag.toLowerCase()

    // на этом элементе завершаем рекурсию
    if (tag === 'body') {
        path = tag + path
        return path
    }

    // Смотрим селекторы
    let selector = ''

    // ID и класс
    if (el.id) {
        selector = '#' + el.id
    } else if (el.className) {
        selector = '.' + el.className
    }

    // если нет ни ID, ни класса - высчитываем child
    if (selector === '') {
        let n = 0
        let currEl = el
        while (currEl.previousElementSibling) {
            n++
            currEl = currEl.previousElementSibling
        }
        if (n === 0) {
            if (currEl.nextElementSibling) {
                selector = ':first-child'
            }
        } else {
            selector = `:nth-child(${n + 1})`
        }
    }

    // добавляем к пути тэг и селектор
    selector = selector.toLowerCase()
    path = ' ' + tag + selector + path

    // если есть родительский элемент, рекурсивно вызываем эту же функцию
    if (el.parentElement) {
        return getParentElementPath(el.parentElement, path)
    }
    // если нет родителя - возвращаем путь и заканчиваем рекурсивные вызовы
    return path
}

module.exports = getPath
