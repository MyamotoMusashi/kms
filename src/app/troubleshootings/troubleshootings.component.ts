import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-troubleshootings',
  templateUrl: './troubleshootings.component.html',
  styleUrls: ['./troubleshootings.component.css']
})
export class TroubleshootingsComponent implements OnInit {

  troubleshootings = [];

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAllTroubleshootings()
  }

  getAllTroubleshootings() {
    this.urlsService.getAllTroubleshootings().subscribe(troubleshootings => {
      this.troubleshootings = troubleshootings;
    })
  }
}
