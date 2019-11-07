import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private host: string = environment.apiHost;

  constructor(private http: HttpClient) {
   }

  getAllUrls(){
    let options = { headers: new HttpHeaders({Authorization: 'Basic ' + btoa('buzz:1234')}) }
    return this.http.get<any[]>('http://localhost:8000/api/urls', options)
  }

  addUrl(url: String, issueId: String) {
    let body = {
      url: url,
      issueId: issueId
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`http://localhost:8000/api/urls`, body, options)
  }

  getAllIssues(){
    return this.http.get<any[]>('http://localhost:8000/api/issues')
  }

  getAllInforForIssueById(id){
    return this.http.get<any[]>(`http://localhost:8000/api/issues/${id}`)
  }

  getAllTroubleshootingsById(id){
    return this.http.get<any[]>(`http://localhost:8000/api/troubleshootings/${id}`)
  }

  addIssue(issue: String, category: String){
    let body = {
      issue: issue,
      category: category
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    
    return this.http.post(`http://localhost:8000/api/issues`, body, options)
  }
}
