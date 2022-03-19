import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { $ } from 'jquery';
import * as Quill from 'quill';
import {concatMap} from 'rxjs/operators'

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
  commentsData;
  commentDate = new Date()
  commentsDataArray;
  commentDateString;
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
    this.getUrlById(id)
    this.getNextActionStepsByUrlId(id);
    this.urlsService.getAllResolutions().subscribe((data) => {
      this.data = data.map((resolution) => resolution.resolution);
    });
    this.comments(id)
  }

  getUrlById(id){
    this.urlsService.getUrlById(id).subscribe((url) => {
      this.url = url;
      console.log(this.url)
    })
  }

  editUrlById(){
    const id = this.route.snapshot.paramMap.get('id')
    const urlTitle = (<HTMLInputElement> document.getElementById('urlTitleInput')).value;
    const urlUrl = (<HTMLInputElement> document.getElementById('urlUrlInput')).value;
    const urlNextActionSteps = (<HTMLInputElement> document.getElementById('urlNextActionStepsInput')).value;
    const urlResolutionId = (<HTMLInputElement>(document.getElementById('urlResolutionIdInput'))).value;
    this.urlsService
      .editUrlById(
        urlTitle,
        urlUrl,
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
    this.url['resolution'] = event.resolution;
  }

  onIssueItemSelected(event) {
    this.url['issue'] = event.issue;
  }

  comments(id) {
    this.urlsService.getUrlById(id).pipe(
      concatMap((data) => {
        let urlId = data['url'].match(/[0-9]+/)
        return this.urlsService.getUrlComments(urlId[0])
      })
    ).subscribe(data => {
      this.commentsData = data;
      this.commentsData = JSON.parse(this.commentsData)
      console.log(this.commentsData)
      this.commentsDataArray = this.commentsData['comments']
      for(let i = 0; i < this.commentsDataArray.length; i++) {
        for (let j = 0; j < this.commentsData['users'].length; j++) {
          if(this.commentsDataArray[i]['author_id'] == this.commentsData['users'][j]['id']){
            this.commentsDataArray[i]['author_extended'] = this.commentsData['users'][j]
          }
        }
      }
      this.commentDateString = this.commentDate.toLocaleDateString()
    })
  }
}
