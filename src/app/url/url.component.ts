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

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.getUrlById(id)
  }

  getUrlById(id){
    this.urlsService.getUrlById(id).subscribe(url => {
      this.url = url
      console.log(this.url)
    })
  }

  editUrlById(){
    const id = this.route.snapshot.paramMap.get('id')
    let urlTitle = (<HTMLInputElement> document.getElementById('urlTitleInput')).value
    let urlUrl = (<HTMLInputElement> document.getElementById('urlUrlInput')).value
    let urlIssueId = (<HTMLInputElement> document.getElementById('urlIssueIdInput')).value
    let urlResolutionId = (<HTMLInputElement> document.getElementById('urlResolutionIdInput')).value
    this.urlsService.editUrlById(urlTitle, urlUrl, urlIssueId, urlResolutionId, id).subscribe(() => {
      window.location.reload(true)
    })
  }

  editResolutionByUrlId(){
    const id = this.route.snapshot.paramMap.get('id')
    let urlResolution = (<HTMLInputElement> document.getElementById('urlResolutionInput')).value
    this.urlsService.editResolutionByUrlId(urlResolution, id).subscribe(() => {
      window.location.reload(true)
    })
  }
}
