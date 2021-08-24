import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { TabsComponent } from './tabs/tabs.component'
import { RecentComponent } from './recent/recent.component'
import { GoComponent } from './go/go.component'
import { SettingsComponent } from './settings/settings.component';
import { TabNamePipe } from './tab-name.pipe'

@NgModule({
	declarations: [AppComponent, TabsComponent, RecentComponent, GoComponent, SettingsComponent, TabNamePipe],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
