import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { KardexModel } from 'src/app/models/Kardex.model';
import { KardexService } from 'src/app/services/kardex.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css'],
})
export class KardexComponent implements OnDestroy {
  kardexes: Array<KardexModel> = [];
  form: FormGroup;
  loading: boolean;
  redirect: RedirectionHelper;

  constructor(
    private kardexService: KardexService,
    private loginService: LoginService,
    private route: Router
  ) {
    this.form = this.kardexService.form;
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    this.getKardexes(form)
      .then((res) => {
        this.kardexes.push(res[0]);
        this.loading = false;
      })
      .catch((err) => {
        if (err.status === 401) {
          this.redirect = new RedirectionHelper(
            this.loginService,
            this.route,
            err
          );
        }
      });
  }

  getKardexes(form: FormGroup) {
    return new Promise((resolve, reject) => {
      this.kardexService.getKardexByCodeBar(form.value.codebar).subscribe(
        (res) => {
          if (res.length === 0) {
            resolve(res);
          } else {
            this.kardexService.kardexes = res;
            resolve(this.kardexService.kardexes);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
