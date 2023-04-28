import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidatForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import {__values } from 'tslib';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    type : string = "password";
    isText : Boolean = false;
    eyeIcon : string = "fa-eye-slash";
    signUpForm!: FormGroup;

  constructor(private fb : FormBuilder, private auth : AuthService, private router: Router, private toast : NgToastService){}

  ngOnInit(): void { 
    this.signUpForm = this.fb.group({
      
      username : ['',Validators.required],
      password : ['',Validators.required],
      email : ['',Validators.required]
    })
  }
  

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  OnSignUp(){
    if(this.signUpForm.valid){
      
      //send the obj data to database for signup
      
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"success", summary: res.message, duration: 5000})
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }, error:(err)=>{
          this.toast.error({detail: "error", summary: err.message, duration: 5000} )
        }
      })
    }
    else{
      //console.log("form is not valid")
      //throw error using toaster with required fields
      ValidatForm.validateAllFormFields(this.signUpForm);
      alert("your form is Invalid")
    }
  }

  

}
