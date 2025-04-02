import { CartItem } from './../../../shared/interfaces/iorders';
import { Component, OnInit, inject } from '@angular/core';
import { UserordersService } from '../../../core/services/userorders/userorders.service';
import { Iorders } from '../../../shared/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly userordersService = inject(UserordersService);
  userId:string='';
  ispaid:boolean=true;
  userOrders: Iorders[] = [];
  ngOnInit(): void {
    this.getUserId();  
    this.getOrders();
  }
  getUserId():void{
    this.userId = localStorage.getItem('userId')!;
  }
  
  getOrders(){
    this.userordersService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.userOrders = res;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
