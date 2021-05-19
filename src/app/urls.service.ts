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

  getAllUrls(): Observable<Url[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa('buzz:1234'),
      }),
    };

    return this.http.get<Url[]>('http://localhost:8000/api/urls', options);
  }

  getTodayUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`http://localhost:8000/api/urls?today=''`);
  }

  getUrlById(id): Observable<Response> {
    return this.http.get<Response>(`http://localhost:8000/api/urls/${id}`);
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
    urlIssueId,
    urlIssue,
    urlResolutionId,
    urlNextActionSteps,
    urlId
  ): Observable<Response> {
    const body = {
      title: urlTitle,
      url: urlUrl,
      issueId: urlIssueId,
      issue: urlIssue,
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
      `http://localhost:8000/api/urls/${urlId}`,
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
      `http://localhost:8000/api/urls/${urlId}`,
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
      `http://localhost:8000/api/urls/${urlId}`,
      body,
      options
    );
  }

  getNextActionStepsByUrlId(id) {
    return this.http.get(
      `http://localhost:8000/api/urls/${id}/nextActionSteps`
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
      `http://localhost:8000/api/urls/${id}/nextActionSteps`,
      body,
      options
    );
  }

  getAllIssues() {
    return this.http.get<any[]>('http://localhost:8000/api/issues');
  }

  getIssueById(id) {
    return this.http.get(`http://localhost:8000/api/issues/${id}`);
  }

  getAllInforForIssueById(id) {
    return this.http.get<any[]>(`http://localhost:8000/api/issues/${id}/urls`);
  }

  addIssue(issue: string, category: string) {
    const body = {
      issue: issue,
      category: category,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(`http://localhost:8000/api/issues`, body, options);
  }

  editIssueById(issue: any) {
    const body = {
      id: issue.id,
      issue: issue.issue,
      tags: issue.tags,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(
      `http://localhost:8000/api/issues/${body.id}`,
      body,
      options
    );
  }

  getAllTroubleshootings() {
    return this.http.get<any[]>('http://localhost:8000/api/troubleshootings');
  }

  getAllTroubleshootingsById(id) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/troubleshootings/${id}`
    );
  }

  addTroubleshootingByIssueId(troubleshooting: string, issueId: string) {
    const body = {
      troubleshooting: troubleshooting,
      issueId: issueId,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(
      `http://localhost:8000/api/troubleshootings`,
      body,
      options
    );
  }

  getAllResolutions() {
    return this.http.get<any[]>('http://localhost:8000/api/resolutions');
  }

  getAllResolutionsByIssueId(id) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/issues/${id}/resolutions`
    );
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
      `http://localhost:8000/api/urls/${body.id}/resolution`,
      body,
      options
    );
  }

  getAllCategories() {
    return this.http.get<any[]>('http://localhost:8000/api/categories');
  }

  getCategoryById(categoryId) {
    return this.http.get(`http://localhost:8000/api/categories/${categoryId}`);
  }

  editCategoryById(categoryId, categoryCategory, categoryParentCategoryId) {
    const body = {
      category: categoryCategory,
      parentCategoryId: categoryParentCategoryId,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(
      `http://localhost:8000/api/categories/${categoryId}`,
      body,
      options
    );
  }

  getAllSubCategoriesByCategoryId(categoryId) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/categories/${categoryId}/subCategories`
    );
  }

  getAllIssuesByCategoryId(categoryId) {
    return this.http.get<any[]>(
      `http://localhost:8000/api/categories/${categoryId}/issues`
    );
  }

  addIssueToCategory(issue, categoryId) {
    const body = {
      issue: issue,
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      `http://localhost:8000/api/categories/${categoryId}/issues`,
      body,
      options
    );
  }

  addCategory(category: string) {
    const body = {
      category: category,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(
      `http://localhost:8000/api/categories`,
      body,
      options
    );
  }

  addSubCategory(subCategory: string, parentCategoryId) {
    const body = {
      subCategory: subCategory,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(
      `http://localhost:8000/api/categories/${parentCategoryId}/subCategories`,
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
