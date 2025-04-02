import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  cart:Icart={} as Icart;
  isfull:boolean=false;
  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(){
    this.cartService.getLoggedUserDate().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cart=res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeitem(id:string){
    this.cartService.deleteSpecificItem(id).subscribe({
      next:(res)=>{
        this.cart = res.data;
        console.log(res);
        this.cartService.cartItems.set(res.numOfCartItems); 
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  } 
  updateQuatity(id:string,count:number){
    this.cartService.updateCartProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cart= res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    }
      
    )
  }

  clearCart():void{
    this.cartService.clearUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == 'success'){
          this.cart = {} as Icart;
          this.cartService.cartItems.set(0);
        }
      },
      error:(Err)=>{
        console.log(Err);
        
      }
    })
  }

}
