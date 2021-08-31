import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecentComponent } from './recent/recent.component'
import { GoComponent } from './go/go.component'
import { SettingsComponent } from './settings/settings.component'

const routes: Routes = [
	{ path: 'recent', component: RecentComponent },
	{ path: 'go', component: GoComponent },
	{ path: 'settings', component: SettingsComponent },
	// { path: '', redirectTo: '/recent', pathMatch: 'full' },
	{ path: '**', redirectTo: '/recent' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
