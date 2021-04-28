import { Component, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  user: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      private breakpointObserver: BreakpointObserver,
      private loginService: LoginService,
      private route: Router,
      private render: Renderer2,
    ) {}

    ngOnInit(): void {
      this.user = localStorage.getItem('user');
      const welcome = this.render.selectRootElement('.welcome', true);
      setTimeout(() => {
        this.render.removeClass(welcome, 'show');
        this.render.addClass(welcome, 'hide');
      }, 3000);
    }

    public logout(): void {
      this.loginService.logout();
      this.route.navigate(['../login']);
    }

}
