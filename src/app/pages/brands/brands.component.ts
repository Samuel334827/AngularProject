import { Component, OnInit, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands:Ibrands[] = [];
  ngOnInit(): void {
    this.brandsService.getbrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brands=res.data;
        console.log(this.brands);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
