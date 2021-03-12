import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryModel } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public message: string;
  private category: categoryModel;

  constructor(
    private categoryService: CategoryService,
    private loginService: LoginService,
    private render: Renderer2,
    private route: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log();
    

    if (this.activatedRoute.snapshot.queryParams.editionMode) {
      this.setCategoryToUpdate(this.activatedRoute.snapshot.params.id).then(res =>{
          this.categoryService.populateForm(res[0])
      }).catch(
          err => this.categoryService.cleanForm()
        );
    }
    
    this.form = this.categoryService.form;

  }

  public saveCategory(_frame: FormGroup, messageDialog:HTMLElement) {
    const { name } = _frame.value;
    this.category = new categoryModel(name);
    this.categoryService.saveCategoryService(this.category).subscribe(
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

  public setCategoryToUpdate(id:number) {

    return new Promise((resolve,reject)=>{
      this.categoryService.getCategoryById(id).subscribe( res  =>{
        resolve(res);
      }, err => {
        reject(err);
      });
    });
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.categoryService.cleanForm();
  }

}
