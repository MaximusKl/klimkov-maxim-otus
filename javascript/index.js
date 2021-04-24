class MyLeaf extends HTMLElement {
	constructor() {
		super()
		this._id = 0 // id для отображения на странице
		this._level = 0 // уровень вложенности элемента в дереве
	}

	static get observedAttributes() {
		return ['tree_id', 'level']
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'tree_id':
				this._id = newValue
				break
			case 'level':
				this._level = newValue
				break
		}
		this.render()
	}

	get tree_id() {
		return this._id
	}

	set tree_id(v) {
		this.setAttribute('tree_id', v)
		this.render()
	}

	get level() {
		return this._level
	}

	set level(v) {
		this.setAttribute('level', v)
		this.render()
	}

	render() {
		// количество отступов по уровню вложенности
		let indent = ''
		for (let i = 0; i < this._level; i++) {
			indent += '--'
		}

		this.innerHTML = `<p>` + indent + `<span>${this._id}</span></p>`
	}
}

class MyTree extends MyLeaf {
	constructor() {
		super()
		this._items = '' // json-строка со массивом потомков
	}

	static get observedAttributes() {
		return ['tree_id', 'level', 'items']
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'tree_id':
				this._id = newValue
				break
			case 'level':
				this._level = newValue
				break
			case 'items':
				this._items = newValue
				break
		}
		this.render()
	}

	get items() {
		return this._items
	}

	set items(v) {
		this.setAttribute('items', v)
		this.render()
	}

	render() {
		// отображение такое же, как у MyLeaf
		super.render()

		// если есть данные по потомкам
		if (this._items) {
			const obj = JSON.parse(this._items)

			// добавляем в DOM всех потомков
			for (const objElement of obj) {
				addElement(this, objElement, +this._level + 1)
			}
		}
	}
}

// вспомогательная функция загрузки JSON из внешнего файла
function loadJSON(filename) {
	return fetch(filename).then(response => {
		return response.json()
	})
}

// addElement добавляет кастомный элемент как потомка baseElement, устанавливая ему tree_id и level
// если есть items в jsonData, то создаётся my-tree, иначе - my-leaf
function addElement(baseElement, jsonData, level) {
	if (jsonData.items) {
		const newTree = document.createElement('my-tree')
		newTree.tree_id = jsonData.id
		newTree.level = +level
		newTree.items = JSON.stringify(jsonData.items)
		baseElement.appendChild(newTree)
	} else {
		const newLeaf = document.createElement('my-leaf')
		newLeaf.tree_id = jsonData.id
		newLeaf.level = +level
		baseElement.appendChild(newLeaf)
	}
}

// Основная функция, которая создаёт дерево в shadowDOM
function createTree(data, selector) {
	// берём элемент, от которого будем выстраивать дерево
	const el = document.querySelector(selector)

	if (el) {
		// создаём shadowDOM
		const shadowRoot = el.attachShadow({ mode: 'open' })
		shadowRoot.innerHTML = `
            <style>
                p {
                    margin: 0;
                    font-size: 24px
                }
                span {
                    background-color: cyan;
                    font-size: 20px;
                    width: 60px;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid blue;
                    border-radius: 10px;
                    margin-left: 5px;
                }
            </style>
            <h2>CustomElements tree</h2>
        `

		// регистрируем кастомные элементы
		customElements.define('my-tree', MyTree)
		customElements.define('my-leaf', MyLeaf)

		// добавляем корневой элемент в shadowRoot
		addElement(shadowRoot, data, 0)
	} else {
		alert('Root element not found')
	}
}

// Загрузка данных из JSON и вызов создания дерева
loadJSON('./data.json').then(data => {
	createTree(data, '#root')
})
