import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  issues = []
  subCategories = []

  constructor(private urlService: UrlsService, private route: ActivatedRoute) { }

  ngOnInit() {
    let categoryId = this.route.snapshot.paramMap.get('id')
    
    this.urlService.getAllIssuesByCategoryId(categoryId).subscribe((issues) => {
      this.issues = issues
    })

    this.urlService.getAllSubCategoriesByCategoryId(categoryId).subscribe((categories) => {
      this.subCategories = categories
    })

  }

}
