import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidatForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type : string = "password";
  isText : Boolean = false;
  eyeIcon : string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router, private toast : NgToastService){}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  OnLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //send the obj data to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail: "success", summary: res.message, duration: 5000})
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.router.navigate(['dashboard']);
      },
      error:(err) =>{
        this.toast.error({detail: "error", summary:"Something went wrong", duration: 5000})
        //console.log(err);
      }
        
    })
      

    }
    else{
      //console.log("form is not valid")
      //throw error using toaster with required fields
      ValidatForm.validateAllFormFields(this.loginForm);
      alert("your form is Invalid")
    }
  }


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  
  

}
