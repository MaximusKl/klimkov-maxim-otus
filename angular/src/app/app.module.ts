import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { TabsComponent } from './tabs/tabs.component'
import { RecentComponent } from './recent/recent.component'
import { GoComponent } from './go/go.component'
import { SettingsComponent } from './settings/settings.component'
import { FormsModule } from '@angular/forms'
import { PairOfWordsComponent } from './pair-of-words/pair-of-words.component'

@NgModule({
	declarations: [AppComponent, TabsComponent, RecentComponent, GoComponent, SettingsComponent, PairOfWordsComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
