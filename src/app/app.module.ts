import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IssuesComponent } from './issues/issues.component';
import { UrlsComponent } from './urls/urls.component';
import { IssueComponent } from './issue/issue.component';
import { TroubleshootingsComponent } from './troubleshootings/troubleshootings.component';
import { ResolutionsComponent } from './resolutions/resolutions.component';
import { ResolutionComponent } from './resolution/resolution.component';
import { TroubleshootingComponent } from './troubleshooting/troubleshooting.component';
import { UrlComponent } from './url/url.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TrendComponent } from './trend/trend.component';
import * as $ from 'jquery';

const ROUTES = [
  {
    path: 'issues',
    component: IssuesComponent,
  },
  {
    path: 'issues/:id',
    component: IssueComponent,
  },
  {
    path: 'urls',
    component: UrlsComponent,
  },
  {
    path: 'urls/:id',
    component: UrlComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryComponent,
  },
  {
    path: 'resolutions',
    component: ResolutionsComponent,
  },
  {
    path: 'troubleshootings',
    component: TroubleshootingsComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
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
    IssuesComponent,
    UrlsComponent,
    IssueComponent,
    TroubleshootingsComponent,
    ResolutionsComponent,
    ResolutionComponent,
    TroubleshootingComponent,
    UrlComponent,
    SearchComponent,
    CategoriesComponent,
    CategoryComponent,
    TrendComponent,
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
