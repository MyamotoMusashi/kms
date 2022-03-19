import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UrlsComponent } from './urls/urls.component';
import { ResolutionsComponent } from './resolutions/resolutions.component';
import { ResolutionComponent } from './resolution/resolution.component';
import { UrlComponent } from './url/url.component';
import { SearchComponent } from './search/search.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TrendComponent } from './trend/trend.component';
import * as $ from 'jquery';
import { TodayComponent } from './today/today.component';

const ROUTES = [
  {
    path: 'urls',
    component: UrlsComponent,
  },
  {
    path: 'urls/:id',
    component: UrlComponent,
  },
  {
    path: 'today',
    component: TodayComponent
  },
  {
    path: 'resolutions',
    component: ResolutionsComponent,
  },
  {
    path: 'trend',
    component: TrendComponent,
  },
  {
    path: '',
    redirectTo: 'goals',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UrlsComponent,
    ResolutionsComponent,
    ResolutionComponent,
    UrlComponent,
    SearchComponent,
    TrendComponent,
    TodayComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
