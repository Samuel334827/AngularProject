import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categories:WritableSignal<Icategory[]> = signal([])

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories.set(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
      }
    )
  }
  moreDetails(){

  }
}
