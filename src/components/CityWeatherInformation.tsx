import React, { Component } from 'react'
import { CityWeather } from '../App'
import '../styles/CityWeatherInformation.scss'

export interface ICityWeatherInformationProps {
	weather: CityWeather
	favorite: boolean
	onToggleFavoriteCity: () => void
}

export class CityWeatherInformation extends Component<ICityWeatherInformationProps, any> {
	render() {
		return (
			<>
				{this.props.weather.has_got ? (
					<div className="information">
						<div className="information__header">
							Информация по погоде в городе <span className="information__city">{this.props.weather.city}</span>
						</div>
						<hr />
						<div className="information__item">
							Страна:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.country}
							</span>
						</div>
						<div className="information__item">
							Описание:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.description}
							</span>
						</div>
						<div className="information__item">
							Температура:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.temp}
							</span>{' '}
							&deg;C
						</div>
						<div className="information__item">
							Максимальная температура:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.temp_max}
							</span>{' '}
							&deg;C
						</div>
						<div className="information__item">
							Минимальная температура:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.temp_min}
							</span>{' '}
							&deg;C
						</div>
						<div className="information__item">
							Влажность:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.humidity}
							</span>
							%
						</div>
						<div className="information__item">
							Давление:{' '}
							<span
								className="information__item_bold
							">
								{this.props.weather.pressure}
							</span>{' '}
							hPa
						</div>
						<div className="information__favorite information__item">
							<label>Избранный город</label>
							<input type="checkbox" checked={this.props.favorite} onChange={this.props.onToggleFavoriteCity} />
						</div>
					</div>
				) : this.props.weather.error ? (
					<div className="error">Ошибка: {this.props.weather.error}</div>
				) : (
					<div className="no-data">Нет данных</div>
				)}
			</>
		)
	}
}
