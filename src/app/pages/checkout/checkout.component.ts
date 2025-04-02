import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { validateHeaderName, validateHeaderValue } from 'http';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../core/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly checkoutService = inject (CheckoutService);
  userInfoForm!:FormGroup;
  cartId:string='';
  ngOnInit(): void {
    this.userInfoForm = this.formBuilder.group({
      details:[null, Validators.required],
      phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null,Validators.required]
    })
    this.getCartId();
  }

  getCartId(){
    return this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cartId = res.get('id') !
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  submitForm(){
    this.checkoutService.checkout(this.cartId,this.userInfoForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        open(res.session.url,'_self');
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
     
  }
}
