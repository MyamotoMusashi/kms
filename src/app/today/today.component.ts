import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Url } from '../models/url.model';
import { UrlsService } from '../urls.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  urls = [] as Url[];
  url = new Url();
  issues = [];

  constructor(
    private urlsService: UrlsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getTodayUrls();
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
        this.url.issue,
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
