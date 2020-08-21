import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { Url } from '../models/url.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data = [] as Url[];
  keyword = 'url';

  constructor(private urlsService: UrlsService) {}

  ngOnInit(): void {
    this.urlsService.getAllUrls().subscribe((urls) => {
      this.data = urls;
    });
  }

  Sync(): void {
    this.urlsService.Sync().subscribe(() => {
      window.location.reload(true);
    });
  }
}
