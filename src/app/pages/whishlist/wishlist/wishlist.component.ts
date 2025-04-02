import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../../shared/interfaces/iwishlist';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  wishList:WritableSignal<Iwishlist[]> = signal([])
 
  ngOnInit(): void {
    this.getUserWishList();
  }
  getUserWishList(){
    this.wishlistService.getLoggedUserWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishList.set(res.data);
        
        
      },error:(err)=>{
        console.log(err);
      }
    })
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


}
