import { categoriesData, productsData, UsersBuckets, usersData } from './data.js'

// возвращает все категории товаров
const getCategories = function () {
	return categoriesData
}

// возвращает всех зарегистрированных покупателей
const getUsers = function () {
	return usersData
}

// возвращает данные покупателя с определённым идентификатором-логином
const getUser = function ({ login }) {
	return usersData.filter(user => user.login === login)[0]
}

// возвращает данные по товарам
// дополнительно может присутствовать аргумент с категорией (input ProductCategoryInput), по которой будет производится отбор
const getProducts = function (args) {
	// полная копия списка товаров для дальнейших преобразований полей
	let result = JSON.parse(JSON.stringify(productsData))

	// если в аргументах есть указание категории
	if (args.category) {
		// const category = args.category.name
		// фильтруем массив по признаку категории
		result = result.filter(product => product.category === args.category.name)
	}

	// Проходим по массиву товаров и заменяем имя категории на соответствующий объект из списка категорий
	result = result.map(product => {
		product.category = categoriesData.filter(category => category.name === product.category)[0]
		return product
	})

	return result
}

// высчитывает общую стоимость товаров в корзине с учётом чкидки для конкретного покупателя
function calcAmount(login, bucket) {
	// ищем пользователя
	const user = usersData.filter(user => user.login === login)[0]

	if (user) {
		// сичтаем общую стоимость товаров в корзине
		let amount = bucket.products.reduce((acc, el) => {
			return acc + el.product.price * el.quantity
		}, 0)

		// вычитаем скидку
		amount = amount - (amount / 100) * user.discount

		return amount
	} else {
		return 0
	}
}

// заменяет в списке товаров корзины поля с именем категории на соотвествующие объекты из списка категорий
function fillCategoryInBucket(bucket) {
	// полная копия списка товаров в корзине для дальнейших преобразований полей
	let result = JSON.parse(JSON.stringify(bucket))

	// Проходим по массиву товаров и заменяем имя категории на соответствующий объект из списка категорий
	result.products = result.products.map(el => {
		el.product.category = categoriesData.filter(category => category.name === el.product.category)[0]
		return el
	})

	return result
}

// возвращает содержимое корзины для конкретного покупателя
const getUserBucket = function ({ login }) {
	// смотрим, есть ли корзина для данного покупателя
	const bucket = UsersBuckets[login]

	if (bucket) {
		// если есть - возвращаем
		return fillCategoryInBucket(bucket)
	} else {
		// если нет - возвращаем пустой объект
		return {}
	}
}

// добавляет некое количество (quantity) определённого товара (productID) в корзину покупателя (login)
const addProductToUserBucket = function ({ login, productID, quantity }) {
	// смотрим, есть ли корзина для данного покупателя
	let bucket = UsersBuckets[login]

	// ищем товар по его ID
	const product = productsData.filter(product => product.id === productID)[0]
	// если нет такого товара - ничего не делаем и возвращаем ту же корзину
	if (!product) {
		return bucket
	}

	// если уже есть товары в корзине
	if (bucket) {
		// Есть уже такой товар в корзине?
		const haveProduct = bucket.products.filter(el => el.product.id === productID).length > 0

		if (haveProduct) {
			// если есть, то проходимся по товарам в корзине и для нужного товара прибавляем требуемое количество
			bucket.products = bucket.products.map(el => {
				if (el.product.id === productID) {
					el.quantity += quantity
				}
				return el
			})
		} else {
			// если нет - добавляем товар в список товаров
			bucket.products.push({
				product,
				quantity,
			})
		}
	} else {
		// создаём козину
		bucket = {
			products: [
				{
					product,
					quantity,
				},
			],
		}

		// записываем корину в общий список корзин
		UsersBuckets[login] = bucket
	}

	// пересчитываем стоимость корзины
	bucket.amount = calcAmount(login, bucket)

	return fillCategoryInBucket(bucket)
}

export const root = {
	categories: getCategories,
	products: getProducts,
	users: getUsers,
	user: getUser,
	userBucket: getUserBucket,

	buyProduct: addProductToUserBucket,
}
