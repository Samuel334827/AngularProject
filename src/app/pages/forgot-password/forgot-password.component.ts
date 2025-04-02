import { Token } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgSuccess:string='';
  step:number=1;
  emailValuetest:string='';
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(this.emailValuetest,[Validators.required,Validators.email])
  })
  
  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^.{5,}$/)])
  })
  
  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(this.emailValuetest,[Validators.required,Validators.email]) ,
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].*$/)]),
  })
  verifyEmailSubmit(){
    this.authService.sendEmailVerify(this.verifyEmail.value).subscribe({

      next:(res)=>{
        console.log(res);
        this.msgSuccess=res.message;
        setTimeout(() => {
          if(res.statusMsg=='success'){
            this.step=2;
          }
        }, 1000);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  verifyCodeSubmit(){
    this.authService.sendCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        setTimeout(() => {
          if(res.status=='Success'){
            this.step=3;
          }
        }, 1000);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  resetPasswordSubmit(){
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token);
        this.authService.decodeToken();
        this.router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
