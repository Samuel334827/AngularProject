import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { };
  
  cartItems:WritableSignal<number>= signal(0);

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {
      "productId": id
    }, 
    {
      headers:{
        token:localStorage.getItem('token')!
      }
    }
    )
  }

  getLoggedUserDate():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart',
    {
      headers:{
        token:localStorage.getItem('token')!
      }
    }
    )
  }
  deleteSpecificItem(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers:{
        token:localStorage.getItem('token')!
      }
    }
    )
  }
  updateCartProductQuantity(id :string, count:number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      "count": count,
    },
    {
      headers:{
        token:localStorage.getItem('token')!
      }
    }
    )
  }

  clearUserCart():Observable<any>{
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers:{
          token:localStorage.getItem('token')!
        }
      }    
    )
  }



}
