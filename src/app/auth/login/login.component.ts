import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public frame: FormGroup;
  public errorLoginMessage: string = null;
  public loading: boolean;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.route.navigate(['app/']);
    }

    this.frame = this.fb.group({
      // first: defaultValue, validators
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(frame: FormGroup): void {
    this.loading = true;
    this.loginService.loginService(frame.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user.name);
        localStorage.setItem('role', res.user.role);
        this.loading = false;
        this.route.navigate(['app/']);
      },
      err => {
        const { error } = err;
        setTimeout(() => {
          this.errorLoginMessage = error.message;
          this.loading = false;
          setTimeout(() => {
            this.errorLoginMessage = null;
          }, 3000);
        }, 0);
      }
    );
  }
}
