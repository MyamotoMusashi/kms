import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Url } from './models/url.model';

@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  private host: string = environment.apiHost;

  constructor(private http: HttpClient) {}

  getUrlComments(urlId) {
    return this.http.get(`http://localhost:8080/api/comments/${urlId}`)
  }

  getAllUrls(): Observable<Url[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa('buzz:1234'),
      }),
    };

    return this.http.get<Url[]>('http://localhost:8080/api/urls', options);
  }

  getTodayUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`http://localhost:8080/api/today`);
  }

  getUrlById(id): Observable<Response> {
    return this.http.get<Response>(`http://localhost:8080/api/urls/${id}`);
  }

  addUrl(url: string, issueId: string, title: string): Observable<Response> {
    const body = {
      url: url,
      issueId: issueId,
      title: title,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<Response>(
      `http://localhost:8000/api/urls?source=angular`,
      body,
      options
    );
  }

  editUrlById(
    urlTitle: string,
    urlUrl: string,
    urlResolutionId,
    urlNextActionSteps,
    urlId
  ): Observable<Response> {
    const body = {
      title: urlTitle,
      url: urlUrl,
      resolutionId: urlResolutionId,
      nextActionSteps: urlNextActionSteps,
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }),
    };

    return this.http.put<Response>(
      `http://localhost:8080/api/urls/${urlId}`,
      body,
      options
    );
  }

  assignUrlToMe(urlId) {
    const body = {};

    const options = {
      params: { assignee: 'gdragnev' },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }),
    };

    return this.http.put(
      `http://localhost:8080/api/urls/${urlId}`,
      body,
      options
    );
  }

  assignUrlToOpen(urlId) {
    const body = {};

    const options = {
      params: {
        assignee: null,
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }),
    };

    return this.http.put(
      `http://localhost:8080/api/urls/${urlId}`,
      body,
      options
    );
  }

  getNextActionStepsByUrlId(id) {
    return this.http.get(
      `http://localhost:8080/api/urls/${id}/nextActionSteps`
    );
  }

  addActionStepToHIstoryByUrlId(actionStep: string, id) {
    const body = {
      actionStep: actionStep,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(
      `http://localhost:8080/api/urls/${id}/nextActionSteps`,
      body,
      options
    );
  }

  getAllResolutions() {
    return this.http.get<any[]>('http://localhost:8080/api/resolutions');
  }

  editResolutionByUrlId(resolution, id) {
    const body = {
      resolution: resolution,
      id: id,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(
      `http://localhost:8080/api/urls/${body.id}/resolution`,
      body,
      options
    );
  }

  Sync() {
    const body = {};

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put('http://localhost:8000/api/urls', body, options);
  }
}
