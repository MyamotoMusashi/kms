import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { Url } from '../models/url.model';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data = [] as Url[];
  keyword = 'url';
  remainingTime
  remainingTimeSubscription = new Subscription();
  


  constructor(private urlsService: UrlsService, private router: Router) {}

  ngOnInit(): void {
    this.urlsService.getAllUrls().subscribe((urls) => {
      this.data = urls;
      console.log(this.data.length);
    });
    this.remainingTimeSubscription = interval(1000)
           .subscribe(x => {
            let currentTime = new Date(),
            midnight = new Date()
            midnight.setHours(26 - currentTime.getHours(), 0 - currentTime.getMinutes(), 0 - currentTime.getSeconds());
            this.remainingTime = `${midnight.getHours()}:${midnight.getMinutes()}:${midnight.getSeconds()} Hours`;
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
