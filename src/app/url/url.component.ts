import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { $ } from 'jquery';
import * as Quill from 'quill';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  url = {};
  nextActionSteps;
  keyword = 'resolution';
  keyword2 = 'issue';
  data = [];
  issues = [];
  quill;

  constructor(
    private urlsService: UrlsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.quill = new Quill(document.getElementById('addActionStepToHistoryInput'), {
      theme: 'snow',
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.getUrlById(id);
    this.getNextActionStepsByUrlId(id);
    this.urlsService.getAllResolutions().subscribe((data) => {
      this.data = data.map((resolution) => resolution.resolution);
    });
    this.urlsService.getAllIssues().subscribe((issues) => {
      this.issues = issues.map((issue) => issue.issue);
    });
  }

  getUrlById(id){
    this.urlsService.getUrlById(id).subscribe((url) => {
      this.url = url;
    });
  }

  editUrlById(){
    const id = this.route.snapshot.paramMap.get('id')
    const urlTitle = (<HTMLInputElement> document.getElementById('urlTitleInput')).value;
    const urlUrl = (<HTMLInputElement> document.getElementById('urlUrlInput')).value;
    const urlIssueId = (<HTMLInputElement> document.getElementById('urlIssueIdInput')).value;
    const urlNextActionSteps = (<HTMLInputElement> document.getElementById('urlNextActionStepsInput')).value;
    const urlResolutionId = (<HTMLInputElement>(document.getElementById('urlResolutionIdInput'))).value;
    this.urlsService
      .editUrlById(
        urlTitle,
        urlUrl,
        urlIssueId,
        this.url['issue'],
        urlResolutionId,
        urlNextActionSteps,
        id
      )
      .subscribe(() => {
        window.location.reload(true)
      });
  }

  editResolutionByUrlId(){
    console.log(this.url['resolution']);
    const id = this.route.snapshot.paramMap.get('id');
    this.urlsService
      .editResolutionByUrlId(this.url['resolution'], id)
      .subscribe(() => {
        window.location.reload(true);
      });
  }

  addActionStepToHistoryByUrlId() {
    const actionStep = this.quill.root.innerHTML;
    const id = this.route.snapshot.paramMap.get('id');
    this.urlsService
      .addActionStepToHIstoryByUrlId(actionStep, id)
      .subscribe(() => {
        window.location.reload(true);
      });
  }

  getNextActionStepsByUrlId(id) {
    this.urlsService.getNextActionStepsByUrlId(id).subscribe((data) => {
      this.nextActionSteps = data;
    });
  }

  completeNextActionStepsByUrlId(){
    console.log('it works');
  }

  assignUrlToMe() {
    const id = this.route.snapshot.paramMap.get('id');
    this.urlsService.assignUrlToMe(id).subscribe(() => {
      window.location.reload(true);
    });
  }

  assignUrlToOpen() {
    const id = this.route.snapshot.paramMap.get('id');
    this.urlsService.assignUrlToOpen(id).subscribe(() => {
      window.location.reload(true);
    })
  }

  onSelected(event) {
    console.log(event.resolution);
    this.url['resolution'] = event.resolution;
    console.log(this.url['resolution']);
  }

  onIssueItemSelected(event) {
    console.log(this.url);
    console.log(event);
    this.url['issue'] = event.issue;
  }
}
