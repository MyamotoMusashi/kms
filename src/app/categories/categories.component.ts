import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = []

  constructor(private urlsService: UrlsService) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories(){
    this.urlsService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories)
    })
  }

  addCategory(){
    let category = (<HTMLInputElement> document.getElementById("categoryInput")).value
    console.log(category)
  }

}
