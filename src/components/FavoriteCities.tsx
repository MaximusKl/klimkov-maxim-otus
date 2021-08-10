import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/FavoriteCities.scss'

export interface IFavoriteCitiesProps {
	cities: Array<string>
}

export class FavoriteCities extends Component<IFavoriteCitiesProps, any> {
	render() {
		return (
			<div className="list">
				<div className="list__header">Избранные города</div>
				{this.props.cities.length > 0 ? (
					<div>
						{this.props.cities.map((city, index) => (
							<Link key={index} to={city}>
								<div className="list__item">{city}</div>
							</Link>
						))}
					</div>
				) : (
					<div className="list__empty">Список пуст</div>
				)}
			</div>
		)
	}
}
