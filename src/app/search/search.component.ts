import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { Url } from '../models/url.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data = [] as Url[];
  keyword = 'url';

  constructor(private urlsService: UrlsService, private router: Router) {}

  ngOnInit(): void {
    this.urlsService.getAllUrls().subscribe((urls) => {
      this.data = urls;
      console.log(this.data.length);
    });
  }

  Sync(): void {
    this.urlsService.Sync().subscribe(() => {
      window.location.reload(true);
    });
  }

  Search(): void {
    let searchKeyword = (<HTMLInputElement>document.getElementById('searchInput')).value;
    for (let i = 0; i < this.data.length; i++){
      if (this.data[i].url == searchKeyword) {
        this.router.navigateByUrl(`/urls/${this.data[i].id}`);
      }
    }
  }
}
