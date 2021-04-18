const getPath = require('./2-getPath')

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')

jest.dontMock('fs')

// формируем тестовую DOM
document.documentElement.innerHTML = html.toString()

describe('getPath', () => {
    it('should return "body" on body', () => {
        const result = getPath(document.getElementsByTagName('body')[0])
        expect(result).toBe('body')
    })

    it('should return "body div.div1" on first div', () => {
        const result = getPath(document.getElementsByClassName('div1')[0])
        expect(result).toBe('body div.div1')
    })

    it('should return "body div.div1 div:nth-child(2) ul li#first_li" on first li', () => {
        const result = getPath(document.getElementById('first_li'))
        expect(result).
            toBe('body div.div1 div:nth-child(2) ul li#first_li')
    })

    it('should return "body div.div1 div:nth-child(2) ul li:nth-child(4)" on last li', () => {
        const result = getPath(document.querySelector('body div.div1 div:nth-child(2) ul li:nth-child(4)'))
        expect(result).
            toBe('body div.div1 div:nth-child(2) ul li:nth-child(4)')
    })
})


