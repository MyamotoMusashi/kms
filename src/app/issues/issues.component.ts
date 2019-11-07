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

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAllIssues()
  }

  getAllIssues() {
    this.urlsService.getAllIssues().subscribe(issues => {
      this.issues = issues;
    })
  }

  addIssue(){
    let issueInput = (<HTMLInputElement>document.getElementById("issueInput")).value
    let categoryInput = (<HTMLInputElement>document.getElementById("categoryInput")).value
    this.urlsService.addIssue(issueInput, categoryInput).subscribe(() => {
      window.location.reload(true);
    })

  
  }
}
