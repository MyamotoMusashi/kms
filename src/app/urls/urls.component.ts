import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../models/url.model';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css'],
})
export class UrlsComponent implements OnInit {
  urls = [] as Url[];
  issues = [];

  constructor(
    private urlsService: UrlsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      if (queryParams[`params`][`today`] === '') {
        this.getTodayUrls();
      } else {
        this.getAllUrls();
      }
    });
  }

  getAllUrls(): void {
    this.urlsService.getAllUrls().subscribe((urls) => {
      this.urls = urls;
    });
  }

  getTodayUrls(): void {
    this.urlsService.getTodayUrls().subscribe((urls) => {
      this.urls = urls;
    });
  }

  getAllIssues(): void {
    this.urlsService.getAllIssues().subscribe((issues) => {
      this.issues = issues;
    });
  }
}
