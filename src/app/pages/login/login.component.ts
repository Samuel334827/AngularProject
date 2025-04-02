import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login : FormGroup = new FormGroup({
    email:new FormControl(null),
    password:new FormControl(null),
  })
  
  private readonly router =inject(Router)
  private readonly authService = inject(AuthService);

  isLoading:boolean=false;
  msgError:string="";
  msgSuccess:string="";
  submit():void{
    this.isLoading=true;
    
    if(this.login.valid){
      this.authService.sendLoginForm(this.login.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this.msgSuccess=res.message;
            
            setTimeout(() => {
              localStorage.setItem('token',res.token); 
              this.authService.decodeToken();
              console.log(this.authService.decodedData);
              this.router.navigate(['/home']);
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
    }
  }

  

}
