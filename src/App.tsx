import React, { createContext, FormEvent, useEffect, useState } from 'react'
import './styles/app.scss'
import { FavoriteCities } from './components/FavoriteCities'
import { CityInputForm } from './components/CityInputForm'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'
import { CityWeatherInformation } from './components/CityWeatherInformation'

const LOCALSTORAGE_FAVORITES_KEY = 'weather-app-favorites'

export const Context = createContext({ favoriteCities: new Array<string>(), toggleFavorite: (city: string): void => {} })

const App = () => {
	const [currentCity, setCurrentCity] = useState('')
	const [favoriteCities, setFavoriteCities] = useState(new Array<string>())
	const history = useHistory()

	function inputCity(event: FormEvent<HTMLInputElement>): void {
		const currentCity = event.currentTarget.value.toUpperCase()
		setCurrentCity(() => currentCity)
	}

	function searchCityClick(): void {
		history.push(`/${currentCity}`)
	}

	function toggleFavorite(city: string): void {
		const t = favoriteCities.indexOf(city.toUpperCase())
		if (t >= 0) {
			const len = favoriteCities.length
			const newFavorites = [...favoriteCities.slice(0, t), ...favoriteCities.slice(t + 1, len)]
			setFavoriteCities(() => newFavorites)
			localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(newFavorites))
		} else {
			const newCity = city.toUpperCase()
			const newFavorites = [...favoriteCities, newCity]
			setFavoriteCities(() => newFavorites)
			localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(newFavorites))
		}
	}

	useEffect(() => {
		const favorites = localStorage.getItem(LOCALSTORAGE_FAVORITES_KEY)
		setFavoriteCities(() => (favorites ? JSON.parse(favorites) : []))
	}, [])

	return (
		<Context.Provider value={{ favoriteCities: favoriteCities, toggleFavorite: toggleFavorite }}>
			<div className="container">
				<h1>Weather application</h1>
				<div className="fav_pane">
					<FavoriteCities cities={favoriteCities} />
				</div>
				<div className="city_pane">
					<CityInputForm currentCity={currentCity} onSearchCity={searchCityClick} onChange={inputCity} />

					<Route component={CityWeatherInformation} path="/:city" exact />
				</div>
			</div>
		</Context.Provider>
	)
	// }
}

const AppWrapper = () => {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
}

export default AppWrapper
