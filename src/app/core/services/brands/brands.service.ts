import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private HttpClient:HttpClient) { }

  getbrands():Observable<any>{
    return this.HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

}
