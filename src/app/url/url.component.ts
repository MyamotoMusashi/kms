import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  url = {}
  nextActionSteps;
  keyword = 'resolution';  
  data = [];

  

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.getUrlById(id)
    this.getNextActionStepsByUrlId(id)
    this.urlsService.getAllResolutions().subscribe(data => {
      this.data = data.map(resolution => resolution.resolution)
    })
  }

  getUrlById(id){
    this.urlsService.getUrlById(id).subscribe(url => {
      this.url = url
    })
  }

  editUrlById(){
    const id = this.route.snapshot.paramMap.get('id')
    let urlTitle = (<HTMLInputElement> document.getElementById('urlTitleInput')).value
    let urlUrl = (<HTMLInputElement> document.getElementById('urlUrlInput')).value
    let urlIssueId = (<HTMLInputElement> document.getElementById('urlIssueIdInput')).value
    let urlResolutionId = (<HTMLInputElement> document.getElementById('urlResolutionIdInput')).value
    let urlNextActionSteps = (<HTMLInputElement> document.getElementById('urlNextActionStepsInput')).value
    this.urlsService.editUrlById(urlTitle, urlUrl, urlIssueId, urlResolutionId, urlNextActionSteps, id).subscribe(() => {
      window.location.reload(true)
    })
  }

  editResolutionByUrlId(){
    console.log(this.url['resolution'])
    const id = this.route.snapshot.paramMap.get('id')
    this.urlsService.editResolutionByUrlId(this.url['resolution'], id).subscribe(() => {
      console.log(this.url['resolution'])
      //window.location.reload(true)
    })
  }

  addActionStepToHistoryByUrlId() {
    let actionStep = (<HTMLInputElement> document.getElementById(`addActionStepToHistoryInput`)).value
    const id = this.route.snapshot.paramMap.get('id')
    this.urlsService.addActionStepToHIstoryByUrlId(actionStep, id).subscribe()
  }
  getNextActionStepsByUrlId(id){
    this.urlsService.getNextActionStepsByUrlId(id).subscribe(data => {
      this.nextActionSteps = data
    })
  }

  completeNextActionStepsByUrlId(){
    console.log('it works')
  }

  assignUrlToMe(){
    const id = this.route.snapshot.paramMap.get('id')
    this.urlsService.assignUrlToMe(id).subscribe()
  }

  onSelected(event){
    console.log(event.resolution)
    this.url['resolution'] = event.resolution
    console.log(this.url['resolution'])
  }
}
