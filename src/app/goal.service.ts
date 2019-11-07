import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Goal } from './models/goal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private host: string = environment.apiHost;

  constructor(private http: HttpClient) { }

  public getGoalByID(id: string): Observable<Goal> {
    return this.http.get<Goal>(`//${this.host}/api/goals/${id}`);
  }

  deleteGoalByID(id: string): Observable<Goal> {
    return this.http.delete<Goal>(`//${this.host}/api/goals/${id}`);
  }

  editGoalByID(id: string, goal: Goal) {
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
    return this.http.put(`//${this.host}/api/goals/${id}`, body,options)
  }

  addSubGoal(id: string, subGoal: Goal) {
    let body = {title: subGoal.title,
                description: subGoal.description,
                parentid: id};
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post(`//${this.host}/api/goals`, body, options)
  }
}
