import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {

  url = {}

  constructor(private urlsService: UrlsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.getUrlById(id)
  }

  getUrlById(id){
    this.urlsService.getUrlById(id).subscribe(url => {
      this.url = url
      console.log(this.url)
    })
  }

  editUrlResolutionById(){
    const id = this.route.snapshot.paramMap.get('id')
    let resolutionInput = (<HTMLInputElement>document.getElementById('resolutionInput')).value
    this.urlsService.editUrlResolutionById(resolutionInput, id).subscribe(() => {
      window.location.reload(true)
    })
  }
}
