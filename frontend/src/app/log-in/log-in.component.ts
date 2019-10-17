import { Component, OnInit } from '@angular/core';
import {AuthResponseModel} from "../auth/auth-response.model";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {LoginModel} from "../auth/login.model";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  message: String;

  constructor(private authService: AuthService) {

  }

  formGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    code: new FormControl(''),
  });

  logIn() {
    if (this.formGroup.valid) {
      let loginModel = new LoginModel();
      loginModel.userName = this.formGroup.get("userName").value;
      loginModel.password = this.formGroup.get("password").value;
      loginModel.token = this.formGroup.get("code").value;
      this.authService.logIn(loginModel).subscribe((res: AuthResponseModel) => {
        this.message = res.message;
      },(err)=>{
        if(err.error.message){
          this.message=err.error.message;
        }
      })
    }
  }

}
