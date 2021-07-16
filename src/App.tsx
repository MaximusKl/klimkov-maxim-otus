import React, { Component, FormEvent, MouseEvent } from 'react'
import './styles/app.scss'
import { FavoriteCities } from './components/FavoriteCities'
import { CityInputForm } from './components/CityInputForm'
import { CityWeatherInformation } from './components/CityWeatherInformation'
import { getWeather } from './api/getWeather'

const LOCALSTORAGE_FAVORITES_KEY = 'weather-app-favorites'

export type CityWeather = {
	city: string
	has_got: boolean
	description: string
	temp: number
	temp_min: number
	temp_max: number
	country: string
	humidity: number
	pressure: number
	error: string
}

interface IAppState {
	currentCity: string
	favoriteCities: Array<string>
	weather: CityWeather
}

export class App extends Component<{}, IAppState> {
	state = {
		currentCity: '',
		favoriteCities: new Array<string>(),
		weather: {
			city: '',
			has_got: false,
			description: '',
			temp: 0,
			temp_min: 0,
			temp_max: 0,
			country: '',
			humidity: 0,
			pressure: 0,
			error: '',
		},
	}

	favoriteClick = (event: MouseEvent<HTMLDivElement>): void => {
		const currentCity = event.currentTarget.innerText
		this.setState({ currentCity })

		this.loadWeather(currentCity)
	}

	inputCity = (event: FormEvent<HTMLInputElement>): void => {
		const currentCity = event.currentTarget.value.toUpperCase()
		this.setState({ currentCity })
	}

	loadWeather = (city: string): void => {
		try {
			getWeather(city).then(data => {
				// console.log('data 2:', data)

				if (data.cod === 200) {
					this.setState({
						weather: {
							has_got: true,
							city,
							description: data.weather[0].description,
							temp: data.main.temp,
							temp_max: data.main.temp_max,
							temp_min: data.main.temp_min,
							humidity: data.main.humidity,
							pressure: data.main.pressure,
							country: data.sys.country,
							error: '',
						},
					})
				} else {
					this.setState({
						weather: {
							...this.state.weather,
							has_got: false,
							error: data.message,
						},
					})
				}
			})
		} catch (error) {
			this.setState({
				weather: {
					...this.state.weather,
					has_got: false,
					error,
				},
			})
		}
	}

	searchCityClick = (): void => {
		this.loadWeather(this.state.currentCity)
	}

	toggleFavorite = (): void => {
		const t = this.state.favoriteCities.indexOf(this.state.currentCity.toUpperCase())
		if (t >= 0) {
			const len = this.state.favoriteCities.length
			const newFavorites = [...this.state.favoriteCities.slice(0, t), ...this.state.favoriteCities.slice(t + 1, len)]
			this.setState({
				favoriteCities: newFavorites,
			})
			localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(newFavorites))
		} else {
			const newCity = this.state.currentCity.toUpperCase()
			const newFavorites = [...this.state.favoriteCities, newCity]
			this.setState({
				favoriteCities: newFavorites,
			})
			localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(newFavorites))
		}
	}

	componentDidMount() {
		const favorites = localStorage.getItem(LOCALSTORAGE_FAVORITES_KEY)
		this.setState({
			favoriteCities: favorites ? JSON.parse(favorites) : [],
		})
	}

	isFavorite = (city: string): boolean => {
		return this.state.favoriteCities.indexOf(city) >= 0
	}

	render() {
		return (
			<div className="container">
				<h1>Weather application</h1>
				<div className="left_pane">
					<FavoriteCities cities={this.state.favoriteCities} onClick={this.favoriteClick} />
				</div>
				<div className="right_pane">
					<CityInputForm currentCity={this.state.currentCity} onSearchCity={this.searchCityClick} onChange={this.inputCity} />
					<CityWeatherInformation
						weather={this.state.weather}
						onToggleFavoriteCity={this.toggleFavorite}
						favorite={this.isFavorite(this.state.currentCity)}
					/>
				</div>
			</div>
		)
	}
}
