import { Component } from '@angular/core'
import { ITranslateDirection, TranslateDirectionService } from '../translate-direction.service'
import { SettingsService } from '../settings.service'

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	get directions(): ITranslateDirection[] {
		this._directions = this.translateDirection.toArray()

		return this._directions
	}

	private _directions: ITranslateDirection[] = []

	constructor(public translateDirection: TranslateDirectionService, public settings: SettingsService) {}

	settingsChange() {
		this.settings.storeSettings()
	}
}
