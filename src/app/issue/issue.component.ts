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
  issue = {}

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getIssueById(id)
    this.getAllInforForIssueById(id)
    this.getAllTroubleshootings(id)
  }

  getIssueById(id) {
    this.urlsService.getIssueById(id).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue)
    })
  }

  getAllInforForIssueById(id) {
    this.urlsService.getAllInforForIssueById(id).subscribe(urls => {
      this.urls = urls;
    })
  }

  getAllTroubleshootings(id) {
    this.urlsService.getAllTroubleshootingsById(id).subscribe(troubleshootings => {
      this.troubleshootings = troubleshootings;
    })
  }

  addUrl() {
    const id = this.route.snapshot.paramMap.get('id')
    let urlInput = (<HTMLInputElement>document.getElementById('urlInput')).value
    this.urlsService.addUrl(urlInput, id).subscribe(() => {
      window.location.reload(true)
    })
  }

}
