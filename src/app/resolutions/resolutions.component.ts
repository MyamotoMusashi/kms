import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.css']
})
export class ResolutionsComponent implements OnInit {

  resolutions = [];

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAllResolutions()
  }

  getAllResolutions() {
    this.urlsService.getAllResolutions().subscribe(resolutions => {
      this.resolutions = resolutions;
    })
  }
}
