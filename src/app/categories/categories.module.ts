import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoriesListComponent, CategoryDetailComponent]
})
export class CategoriesModule { }
