import { Categorydetails } from './../../../shared/interfaces/categorydetails';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-categorydetails',
  imports: [DatePipe,RouterLink],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})
export class CategorydetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);

  categoryId!:any;
  // categorydetails:WritableSignal<Categorydetails[]> =signal([]);
  categorydetails:Categorydetails={} as Categorydetails
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.categoryId=res.get('id');
        this.categoriesService.getcategoryDetails(this.categoryId).subscribe({
          next:(res)=>{
            console.log(res);
            this.categorydetails=res.data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
        
      }      
      
    })
  }

}
