import React, { Component } from 'react'
import '../styles/CityWeatherInformation.scss'
import { RouteComponentProps } from 'react-router-dom'
import { getWeather } from '../api/getWeather'
import { Context } from '../App'

type CityWeather = {
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

interface ICityRouterProps {
	city: string
}

interface ICityState {
	loaded: boolean
}

export class CityWeatherInformation extends Component<RouteComponentProps<ICityRouterProps>, ICityState> {
	state = {
		loaded: false,
	}

	weather: CityWeather = {
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
	}

	componentDidMount() {
		this.loadWeather(this.props.match.params.city)
	}

	componentDidUpdate(prevProps: Readonly<RouteComponentProps<ICityRouterProps>>, prevState: Readonly<ICityState>, snapshot?: any) {
		if (this.props.match.params.city != prevProps.match.params.city) this.loadWeather(this.props.match.params.city)
	}

	loadWeather = (city: string): void => {
		this.setState(() => ({ loaded: false }))
		try {
			getWeather(city).then(data => {
				if (data.cod === 200) {
					this.weather = {
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
					}
				} else {
					this.weather = {
						...this.weather,
						has_got: false,
						error: data.message,
					}
				}
				this.setState(() => ({ loaded: true }))
			})
		} catch (error) {
			this.weather = {
				...this.weather,
				has_got: false,
				error,
			}
			this.setState(() => ({ loaded: true }))
		}
	}

	render() {
		return (
			<Context.Consumer>
				{value =>
					this.weather.has_got ? (
						<div className="information">
							<div className="information__header">
								Информация по погоде в городе <span className="information__city">{this.weather.city}</span>
							</div>
							<hr />
							<div className="information__item">
								Страна:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.country}
								</span>
							</div>
							<div className="information__item">
								Описание:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.description}
								</span>
							</div>
							<div className="information__item">
								Температура:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.temp}
								</span>{' '}
								&deg;C
							</div>
							<div className="information__item">
								Максимальная температура:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.temp_max}
								</span>{' '}
								&deg;C
							</div>
							<div className="information__item">
								Минимальная температура:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.temp_min}
								</span>{' '}
								&deg;C
							</div>
							<div className="information__item">
								Влажность:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.humidity}
								</span>
								%
							</div>
							<div className="information__item">
								Давление:{' '}
								<span
									className="information__item_bold
							">
									{this.weather.pressure}
								</span>{' '}
								hPa
							</div>
							<div className="information__favorite information__item">
								<label>Избранный город</label>
								<input
									type="checkbox"
									checked={value.favoriteCities.indexOf(this.props.match.params.city) >= 0}
									onChange={() => value.toggleFavorite(this.props.match.params.city)}
								/>
							</div>
						</div>
					) : this.weather.error ? (
						<div className="error">Ошибка: {this.weather.error}</div>
					) : (
						<div className="no-data">Нет данных</div>
					)
				}
			</Context.Consumer>
		)
	}
}
