import { categoriesData, productsData, UsersBuckets, usersData } from './data.js'

const getCategories = function () {
	return categoriesData
}

const getUsers = function () {
	return usersData
}

const getUser = function ({ login }) {
	return usersData.filter(user => user.login === login)[0]
}

const getProducts = function (args) {
	let result = JSON.parse(JSON.stringify(productsData))
	if (args.category) {
		const category = args.category.name
		result = result.filter(product => product.category === category)
	}

	result = result.map(product => {
		product.category = categoriesData.filter(category => category.name === product.category)[0]
		return product
	})

	return result
}

function calcAmount(login, bucket) {
	const user = usersData.filter(user => (user.login = login))[0]
	if (user) {
		let amount = bucket.products.reduce((acc, el) => {
			return acc + el.product.price * el.quantity
		}, 0)
		amount = amount - (amount / 100) * user.discount
		return amount
	} else {
		return 0
	}
}

const getUserBucket = function ({ login }) {
	const bucket = UsersBuckets[login]
	if (bucket) {
		return bucket
	} else {
		return {}
	}
}

const addProductToUserBucket = function ({ login, productID, quantity }) {
	let bucket = UsersBuckets[login]

	const product = productsData.filter(product => product.id === productID)[0]
	if (!product) {
		return bucket
	}

	if (bucket) {
		bucket.products = bucket.products.map(el => {
			if (el.product.id === productID) {
				el.quantity += quantity
				return el
			}
		})
		bucket.amount = calcAmount(login, bucket)
	} else {
		if (product) {
			bucket = {
				products: [
					{
						product,
						quantity,
					},
				],
			}
			bucket.amount = calcAmount(login, bucket)
			UsersBuckets[login] = bucket
		}
	}

	bucket.products = bucket.products.map(el => {
		el.product.category = categoriesData.filter(category => category.name === el.product.category)[0]
		return el
	})

	return bucket
}

export const root = {
	categories: getCategories,
	products: getProducts,
	users: getUsers,
	user: getUser,
	userBucket: getUserBucket,

	buyProduct: addProductToUserBucket,
}
