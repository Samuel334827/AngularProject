import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  register : FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].*$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators:this.confirmPassword} )
  
  private readonly router =inject(Router)

  private readonly authService = inject(AuthService);
  isLoading:boolean=false;
  msgError:string="";
  msgSuccess:string="";
  submit():void{
    if(this.register.valid){
      this.isLoading=true
      this.authService.sendRegisterForm(this.register.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this.msgSuccess=res.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }  
          this.isLoading=false
        },
        error:(err)=>{
          if(err.error.message=='fail'){
            this.msgError=err.error.errors.msg;
            return
          }
          this.msgError=err.error.message;
          console.log(err);
          this.isLoading=false
        }
      })
    }else{
      this.register.setErrors({'mismatch':true})
      this.register.markAllAsTouched();
    }
  }

  confirmPassword(group:AbstractControl){
    let password = group.get('password')?.value
    let rePassword = group.get('rePassword')?.value
    if(password===rePassword){
      return null;
    }else{
      return {mismatch:true}
    }
  }




}