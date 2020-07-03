import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {

  urls = [];
  issues = [];

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      if(queryParams[`params`][`today`] === ''){
        this.getTodayUrls();
      }
      else {
        this.getAllUrls();
      }
    })
  }

  getAllUrls() {
    this.urlsService.getAllUrls().subscribe(urls => {
      this.urls = urls
    });
  }

  getTodayUrls() {
    this.urlsService.getTodayUrls().subscribe(urls => {
      this.urls = urls
    })
  }

  getAllIssues() {
    this.urlsService.getAllIssues().subscribe(issues => {
      this.issues = issues;
    })
  }

}
