import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserordersService {

  constructor(private httpClient : HttpClient) { }
  
  //Api logic
  getUserOrders(id:string):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }


}
