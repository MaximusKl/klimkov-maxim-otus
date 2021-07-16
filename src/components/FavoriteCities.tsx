import React, { Component, MouseEvent } from 'react'
import '../styles/FavoriteCities.scss'

export interface IFavoriteCitiesProps {
	cities: Array<string>
	onClick: (event: MouseEvent<HTMLDivElement>) => void
}

export class FavoriteCities extends Component<IFavoriteCitiesProps, any> {
	render() {
		return (
			<div className="list">
				<div className="list__header">Избранные города</div>
				{this.props.cities.length > 0 ? (
					<div>
						{this.props.cities.map((city, index) => (
							<div className="list__item" key={index} onClick={this.props.onClick}>
								{city}
							</div>
						))}
					</div>
				) : (
					<div className="list__empty">Список пуст</div>
				)}
			</div>
		)
	}
}
