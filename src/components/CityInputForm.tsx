import React, { Component, FormEvent, KeyboardEvent } from 'react'
import '../styles/CityInputForm.scss'

export interface ICityInputFormProps {
	currentCity: string
	onChange: (event: FormEvent<HTMLInputElement>) => void
	onSearchCity: () => void
}

export class CityInputForm extends Component<ICityInputFormProps, any> {
	gotCity = () => {
		this.props.onSearchCity()
	}

	checkKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') this.gotCity()
	}

	render() {
		return (
			<div className="form">
				<label className="form__label">
					Введите название города
					<input
						className="form__input"
						name="cityInput"
						autoCapitalize="true"
						value={this.props.currentCity}
						onChange={this.props.onChange}
						onKeyPress={this.checkKey}
					/>
				</label>
				<button className="form__button" onClick={this.gotCity}>
					Искать
				</button>
			</div>
		)
	}
}
