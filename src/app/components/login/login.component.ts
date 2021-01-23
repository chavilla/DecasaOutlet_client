import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public frame:FormGroup;
  public errorLoginMessage: String;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.frame = this.fb.group({
      // first: defaultValue, validators
      email: [ '', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(16), Validators.required]],
    });
  }

  onSubmit(frame): void {
    console.log(frame);
    
  }

}
