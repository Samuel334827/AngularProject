import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from '../../core/services/products/products.service';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject (WishlistService);

  hamada = '';
  products:WritableSignal<Iproduct[]>=signal([]);
  successMessage:string = '';
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.products.set(res.data);
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

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{ 
        localStorage.setItem('userId',res.data.cartOwner) 
        if(res.status=='success'){
          // this.toastrService.success('res.message','Fresh Cart')
        };
        this.cartService.cartItems.set(res.numOfCartItems);
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
