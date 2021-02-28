import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoryModel } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';

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
    private render: Renderer2,
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
        this.toggleElement(messageDialog, err.error.error, 'failed');
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
