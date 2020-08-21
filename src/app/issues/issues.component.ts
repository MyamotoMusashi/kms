import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  issues = [];

  constructor(
    private urlsService: UrlsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllIssues();
  }

  getAllIssues(): void {
    this.urlsService.getAllIssues().subscribe((issues) => {
      this.issues = issues;
    });
  }

  addIssue(): void {
    const issueInput = (<HTMLInputElement>document.getElementById('issueInput')).value;
    const categoryInput = (<HTMLInputElement>document.getElementById('categoryInput')).value;
    this.urlsService.addIssue(issueInput, categoryInput).subscribe(() => {
      window.location.reload(true);
    });
  }
}
