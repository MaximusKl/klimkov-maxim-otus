import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'

const routes = [
	{
		path: '/',
		name: 'Start',
		component: Start,
	},
	{
		path: '/game',
		name: 'Game',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "game" */ '../views/Game.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
