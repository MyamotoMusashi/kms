import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GoalsComponent } from './goals/goals.component';

import { GoalsService } from './goals.service';
import { GoalComponent } from './goal/goal.component';
import { DailygoalsComponent} from './dailygoals/dailygoals.component'
import { AddGoalComponent } from './add-goal/add-goal.component';
import { AddSubGoalComponent } from './add-subgoal/add-subgoal.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GoalsListComponent } from './goals-list/goals-list.component';
import { IssuesComponent } from './issues/issues.component';
import { UrlsComponent } from './urls/urls.component';
import { IssueComponent } from './issue/issue.component';

const ROUTES = [
  {
    path: 'goals',
    component: GoalsComponent
  },
  {
    path: 'goals/daily',
    component: DailygoalsComponent
  },
  {
    path: 'goals/add',
    component: AddGoalComponent
  },
  {
    path: 'goals/:id',
    component: GoalComponent
  },
  {
    path: 'goals/:id/edit',
    component: EditGoalComponent
  },
  {
    path: 'goals/:id/subGoals/add',
    component: AddSubGoalComponent
  },
  {
    path: 'issues',
    component: IssuesComponent
  },
  {
    path: 'issues/:id',
    component: IssueComponent
  },
  {
    path: 'urls',
    component: UrlsComponent
  },
  {
    path: '',
    redirectTo: 'goals',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GoalsComponent,
    DailygoalsComponent,
    GoalComponent,
    AddGoalComponent,
    AddSubGoalComponent,
    EditGoalComponent,
    NavigationComponent,
    GoalsListComponent,
    IssuesComponent,
    UrlsComponent,
    IssueComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
