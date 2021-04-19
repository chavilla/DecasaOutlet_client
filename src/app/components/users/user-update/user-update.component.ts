import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/User.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  form:FormGroup;
  redirect:RedirectionHelper;

  constructor(
    private dialog:MatDialogRef<UserUpdateComponent>,
    private loginService: LoginService,
    private route:Router,
    @Inject(MAT_DIALOG_DATA)
    public data:UserModel,
    private userService:UserService,
  ) {
    console.log(this.data);
    return;
  }

  ngOnInit(): void {

    
    this.form = this.userService.form;
    this.userService.populateForm(this.data);
  }

  //update the client
  onSubmit(){
    this.userService.updateUserService(this.form.value).subscribe( 
      res => {
        this.dialog.close(this.form.value);
      },
      err => {
        if(err.status ===401){
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }      
      }
     );
  }

}
