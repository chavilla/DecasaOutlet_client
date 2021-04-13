import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

interface DATA_STATISTICS {
  users:number,
  categories: number,
  products: number,
  salesMonth: number,
  salesToday: number,
  clients: number,  
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  redirect: RedirectionHelper;
  statistics : DATA_STATISTICS;
  loading: boolean = true;

  constructor(
    private dashboardService:DashboardService,
    private loginService:LoginService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this.getStatistics().then( (res: DATA_STATISTICS) => {
      this.loading = false;
      this.statistics = res;
    }).catch( err => {
      if (err.status === 401) {
        this.redirect = new RedirectionHelper(this.loginService, this.route, err);
      }
    });
  }

  getStatistics() {
    return new Promise((resolve, reject) => {
      this.dashboardService.getStatistics().subscribe( res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
    });
  }

}
