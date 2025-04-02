import { CartItem } from './../../shared/interfaces/iorders';
import { Component, Input, OnInit, Signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  @Input({required:true}) isLogin:boolean=true;
  private readonly cartService = inject(CartService)
  
  cartitems:Signal<number>=computed( ()=>this.cartService.cartItems() )
  readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.cartService.getLoggedUserDate().subscribe({
      next:(res)=>{
        this.cartService.cartItems.set(res.numOfCartItems);
      }
    })

    
  }


}
