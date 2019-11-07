import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Goal } from './models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private host: string = environment.apiHost;

  constructor(private http: HttpClient) { }

  getAllGoals(){
    let options = { headers: new HttpHeaders({Authorization: 'Basic ' + btoa('buzz:1234')}) }
    return this.http.get<Goal[]>(`//${this.host}/api/goals`, options)
  }

  getAllGoalsByQuery(query: string){
    let options = { headers: new HttpHeaders({Authorization: 'Basic ' + btoa('buzz:1234')}) }
    return this.http.get<Goal[]>(`//${this.host}/api/goals?state=${query}`, options)
  }

  addGoal(goal: Goal) {
    let body = {
      title: goal.title,
      description: goal.description
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    
    return this.http.post(`//${this.host}/api/goals`, body, options)
  }

  changePriority(goal: Goal){
    let body = {
      title: goal.title,
      description: goal.description,
      progress: goal.progress,
      isCompleted: goal.isCompleted,
      estimatedWork: goal.estimatedWork,
      remainingWork: goal.remainingWork,
      justification: goal.justification,
      isReoccuring: goal.isReoccuring,
      idealOutcome: goal.idealOutcome,
      scope: goal.scope,
      blockingReason: goal.blockingReason,
      replacement: goal.replacement,
      phase: goal.phase,
      parentid: goal.parentid,
      dueDate: goal.dueDate,
      isDaily: goal.isDaily
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.put(`//${this.host}/api/goals`, body,options)
  }
}