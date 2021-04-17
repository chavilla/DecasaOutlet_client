import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationHelper } from 'src/app/helpers/notification.helper';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { UserModel } from 'src/app/models/User.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent extends NotificationHelper implements OnInit {

  form: FormGroup;
  user: UserModel;
  redirect : RedirectionHelper;
  suggestions: boolean = true;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private userSevice: UserService,
    private render: Renderer2,
    )
    {
      super();
    }

  ngOnInit(): void {
    this.form = this.userSevice.form;
  }

  saveUser(form: FormGroup, messageDialog: HTMLElement) {

    if(form.value.userPassword !== form.value.userPasswordRepeat) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Destructuring to the components
    const { userName, userEmail, userPassword } = form.value;
    this.user = new UserModel(userName, userEmail, userPassword);

    this.userSevice.saveUserService(this.user).subscribe(
      res => {
        this.toggleElement(this.render, messageDialog, res.msg, 'success');
        this.form.reset();
      },
      err => {
        console.clear();
        if (err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService, this.route, err);
        }
        this.toggleElement(this.render, messageDialog, err.error.msg, 'failed');
      }
    );
  }

}
