import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../models/url.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css'],
})
export class UrlsComponent implements OnInit {
  urls = [] as Url[];
  url = new Url();
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

  editNextActionSteps(url): void {
    this.url = url;
    $('#editNextActionStepsModal').modal('show');
  }

  editNextActionStepsByUrlId(): void {
    this.urlsService
      .editUrlById(
        this.url.title,
        this.url.url,
        this.url.issue_id,
        this.url.resolution_id,
        this.url.nextActionSteps,
        this.url.id
      )
      .subscribe(() => {
        window.location.reload(true);
      });
  }
}
