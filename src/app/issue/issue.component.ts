import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  urls = [];
  troubleshootings = [];
  issue = {};
  resolutions = [];
  troubleshooting:String;

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getIssueById(id)
    this.getAllInforForIssueById(id)
    this.getAllTroubleshootings(id)
    this.getAllResolutionsByIssueId(id)
  }

  getIssueById(id) {
    this.urlsService.getIssueById(id).subscribe(issue => {
      this.issue = issue;
    })
  }

  getAllInforForIssueById(id) {
    this.urlsService.getAllInforForIssueById(id).subscribe(urls => {
      this.urls = urls;
      console.log(urls)
    })
  }

  getAllTroubleshootings(id) {
    this.urlsService.getAllTroubleshootingsById(id).subscribe(troubleshootings => {
      this.troubleshootings = troubleshootings;
    })
  }

  getAllResolutionsByIssueId(id) {
    this.urlsService.getAllResolutionsByIssueId(id).subscribe(resolutions => {
      this.resolutions = resolutions;
    })
  }

  addUrl() {
    const id = this.route.snapshot.paramMap.get('id')
    let urlInput = (<HTMLInputElement>document.getElementById('urlInput')).value
    let urlTitleInput = (<HTMLInputElement>document.getElementById('urlTitleInput')).value
    this.urlsService.addUrl(urlInput, id, urlTitleInput).subscribe(() => {
      window.location.reload(true)
    })
  }

  addTroubleshooting(){
    const id = this.route.snapshot.paramMap.get('id')
    this.urlsService.addTroubleshootingByIssueId(this.troubleshooting, id).subscribe(() => {
      window.location.reload(true)
    })
  }

  editIssueById() {
    this.urlsService.editIssueById(this.issue).subscribe(() => {
      window.location.reload()
    })
  }
}
