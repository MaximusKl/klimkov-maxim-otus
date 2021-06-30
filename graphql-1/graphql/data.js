// данные покупателей
export const usersData = [
	{
		login: 'maxim',
		name: 'Maxim',
		surname: 'Klimkov',
		discount: 10,
	},
	{
		login: 'Vasya',
		name: 'Vasily',
		surname: 'Ivanov',
		discount: 5,
	},
]

// категории товаров
export const categoriesData = [
	{
		name: 'Food',
		description: 'All eatable things',
	},
	{
		name: 'Electronics',
		description: 'Electric things',
	},
]

// список товаров
export const productsData = [
	{
		id: 'food_bread',
		name: 'Bread',
		category: 'Food',
		description: 'Very tasty bread',
		price: 100,
	},
	{
		id: 'food_milk',
		name: 'Milk',
		category: 'Food',
		description: 'Shiny white milk',
		price: 200,
	},
	{
		id: 'electronic_monitor',
		name: 'Monitor',
		category: 'Electronics',
		description: '24 inch diagonal',
		price: 1000.5,
	},
]

// Объект для хранения корзин покупателей
export const UsersBuckets = {}
