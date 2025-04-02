import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  
  productId!:any;
  productDetails!:Iproduct ;
  imageCover:WritableSignal<string> = signal('')
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        console.log(res.get('id'));
        this.productId=res.get('id');
        this.productsService.getSpecifcProducts(this.productId).subscribe({
          next:(res)=>{ 
            console.log(res.data);
            this.productDetails=res.data;
            this.imageCover.set(this.productDetails.imageCover);
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
  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status=='success'){
          // this.toastrService.success('res.message','Fresh Cart')
        };
        this.cartService.cartItems.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  };
  changeMainImage(path:string){
    this.imageCover.set(path);
  }

}
