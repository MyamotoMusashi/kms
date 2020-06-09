import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

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

  getUrlById(id){
    return this.http.get(`http://localhost:8000/api/urls/${id}`)
  }

  addUrl(url: String, issueId: String, title: String) {
    let body = {
      url: url,
      issueId: issueId,
      title: title
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`http://localhost:8000/api/urls`, body, options)
  }

  editUrlById(urlTitle, urlUrl, urlIssueId, urlResolutionId, urlNextActionSteps, urlId){
    let body = {
      title: urlTitle,
      url: urlUrl,
      issueId: urlIssueId,
      resolutionId: urlResolutionId,
      nextActionSteps: urlNextActionSteps
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.put(`http://localhost:8000/api/urls/${urlId}`, body, options)
  }

  getAllIssues(){
    return this.http.get<any[]>('http://localhost:8000/api/issues')
  }

  getIssueById(id){
    return this.http.get(`http://localhost:8000/api/issues/${id}`)
  }

  getAllInforForIssueById(id){
    return this.http.get<any[]>(`http://localhost:8000/api/issues/${id}/urls`)
  }


  addIssue(issue: String, category: String){
    let body = {
      issue: issue,
      category: category
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    
    return this.http.post(`http://localhost:8000/api/issues`, body, options)
  }

  editIssueById(issue: any){
    let body = {
      id: issue.id,
      issue: issue.issue,
      tags: issue.tags
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.put(`http://localhost:8000/api/issues/${body.id}`, body, options)
  }

  getAllTroubleshootings(){
    return this.http.get<any[]>('http://localhost:8000/api/troubleshootings')
  }

  getAllTroubleshootingsById(id){
    return this.http.get<any[]>(`http://localhost:8000/api/troubleshootings/${id}`)
  }

  addTroubleshootingByIssueId(troubleshooting: String, issueId: String) {
    let body = {
      troubleshooting: troubleshooting,
      issueId: issueId
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`http://localhost:8000/api/troubleshootings`, body, options)
  }

  getAllResolutions(){
    return this.http.get<any[]>('http://localhost:8000/api/resolutions')
  }

  getAllResolutionsByIssueId(id) {
    return this.http.get<any[]>(`http://localhost:8000/api/issues/${id}/resolutions`)
  }
  
  editResolutionByUrlId(resolution, id) {
    let body = {
      resolution: resolution,
      id: id,
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.put(`http://localhost:8000/api/urls/${body.id}/resolution`, body, options)
  }

  getAllCategories(){
    return this.http.get<any[]>('http://localhost:8000/api/categories')
  }
  
  getCategoryById(categoryId){
    return this.http.get(`http://localhost:8000/api/categories/${categoryId}`)
  }

  editCategoryById(categoryId, categoryCategory, categoryParentCategoryId) {
    let body = {
      category: categoryCategory,
      parentCategoryId: categoryParentCategoryId,
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.put(`http://localhost:8000/api/categories/${categoryId}`, body, options)
  }

  getAllSubCategoriesByCategoryId(categoryId) {
    return this.http.get<any[]>(`http://localhost:8000/api/categories/${categoryId}/subCategories`)
  }

  getAllIssuesByCategoryId(categoryId) {
    return this.http.get<any[]>(`http://localhost:8000/api/categories/${categoryId}/issues`)
  }

  addIssueToCategory(issue, categoryId){
    let body = {
      issue: issue
    }

    let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.post(`http://localhost:8000/api/categories/${categoryId}/issues`, body, options)
  }

  addCategory(category: String){
    let body = {
      category: category
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`http://localhost:8000/api/categories`, body, options)
  }

  addSubCategory(subCategory: String, parentCategoryId) {
    let body = {
      subCategory: subCategory
    }

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }

    return this.http.post(`http://localhost:8000/api/categories/${parentCategoryId}/subCategories`, body, options)
  }
}
