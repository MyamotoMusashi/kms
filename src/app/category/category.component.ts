import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../urls.service';
import { ActivatedRoute } from '@angular/router';
import { throwStatement } from 'babel-types';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category = {}
  issues = []
  subCategories = []
  categoryId = this.route.snapshot.paramMap.get('id')

  constructor(private urlService: UrlsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.urlService.getCategoryById(this.categoryId).subscribe((category) => {
      this.category = category
    })

    this.urlService.getAllIssuesByCategoryId(this.categoryId).subscribe((issues) => {
      this.issues = issues
    })

    this.urlService.getAllSubCategoriesByCategoryId(this.categoryId).subscribe((categories) => {
      this.subCategories = categories
    })
 }

 addSubCategory(){
   let subCategoryInput = (<HTMLInputElement>document.getElementById('subCategoryInput')).value
   console.log(subCategoryInput)
   this.urlService.addSubCategory(subCategoryInput, this.categoryId ).subscribe(() => {
     subCategoryInput = ''
     window.location.reload()
   })
 }

 addIssueToCategory(){
  console.log("TODO")
 }

 editCategory(){
  let editCategoryInput = (<HTMLInputElement>document.getElementById('editCategoryInput')).value,
  editCategoryParentIdInput = (<HTMLInputElement>document.getElementById('editCategoryParentIdInput')).value
  this.urlService.editCategoryById(this.categoryId, editCategoryInput, editCategoryParentIdInput).subscribe(() => {
    window.location.reload()
  })
 }

}
