import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { log } from 'console';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import {CommonModule}from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,CommonModule,SearchPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  hamada = '';
  private readonly productservice = inject(ProductsService);
  private readonly categoriesService=inject(CategoriesService);
  private readonly cartService = inject (CartService);
  private readonly wishlistService = inject (WishlistService);

  // private readonly toastrService = inject (ToastrService);
  
  
  customMainslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 900,
    navText: ['', ''],
    items:1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  isloved:WritableSignal<boolean> = signal(false);
  successMessage:string = '';
  public cartItems!:number;
  products:WritableSignal<Iproduct[]>=signal([])
  categories:WritableSignal<Icategory[]>=signal([])
  getAllProducts(){
    
    this.productservice.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products.set(res.data);
    
      },
      error:(err)=>{
        console.log(err);
      }
    })
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
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res); 
        localStorage.setItem('userId',res.data.cartOwner) 
        if(res.status=='success'){
          // this.toastrService.success('res.message','Fresh Cart')
        };
        this.cartService.cartItems.set(res.numOfCartItems);
        console.log(this.cartService.cartItems);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addTowhishlist(id:string){
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "Product added successfully to your wishlist"){
          setTimeout(() => {
            this.successMessage = res.message;
          }, 500);
          this.successMessage='';
        }
        
      },
      error:(err)=>{
        console.log(err);        
      }
    })
  }
  
  removefromwhishlist(id:string){
    this.wishlistService.removePorductfromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        // if(res.message == "Product added successfully to your wishlist"){
        //   setTimeout(() => {
        //     this.successMessage = res.message;
        //   }, 500);
        //   this.successMessage='';
        // }
        
      },
      error:(err)=>{
        console.log(err);        
      }
    })
  }
  
  
favorites = signal<Record<number, boolean>>(
  JSON.parse(localStorage.getItem('favorites') || '{}')
);

toggleFavorite(productId: number) {
  this.favorites.update(current => {
    const newFavorites = {
      ...current,
      [productId]: !current[productId]
    };
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return newFavorites;
  });
}

}
