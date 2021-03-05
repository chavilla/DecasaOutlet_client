import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  public form: FormGroup;
  public message: string;
  private category: categoryModel;

  constructor(
    private fb: FormBuilder,
    private categoryServie: CategoryService,
    private loginService: LoginService,
    private render: Renderer2,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // first: defaultValue, validators
      name: ['', [Validators.required, Validators.pattern(/(^[A-Z][a-záéíóú]+$)/)]],
    });
  }

  public saveCategory(_frame: FormGroup, messageDialog:HTMLElement) {

    const { name } = _frame.value;
    this.category = new categoryModel(name);
    this.categoryServie.saveCategoryService(this.category).subscribe(
      res => {
        this.toggleElement(messageDialog, res.msg, 'success');
        this.form.reset();
      },
      err => {
        if(err.status===401) {
          alert('Tu sesión expiró. Debes volver al login');
          this.loginService.logout();
          this.route.navigate(['../login']);
        }     
        else if(err.status===400) {
          this.toggleElement(messageDialog, err.error.error, 'failed');
        }
      }
    )
  }

  public toggleElement(toggleElement: HTMLElement, messageStatus:string, className:string) {
    
    setTimeout(() => {
      this.render.removeClass(toggleElement, 'hide');
      this.render.addClass(toggleElement, 'show');
      this.render.addClass(toggleElement, className);
      this.message = messageStatus;
      setTimeout(() => {
        this.render.removeClass(toggleElement, 'show');
        this.render.addClass(toggleElement, 'hide');
        this.render.removeClass(toggleElement, className);
      }, 4000)
    }, 0)
  }

}
