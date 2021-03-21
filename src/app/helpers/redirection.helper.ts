import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

export class RedirectionHelper {

	constructor(
		private loginService:LoginService,
		private route:Router,
		err:HttpErrorResponse,
		) {
			if(err.status ===401) {
				this.logout();
			}
		}

	logout(){
		alert('Su sesión ha expirado. Por favor loguearse nuevamente');
		this.loginService.logout();
		this.route.navigate(['/login']);
	}
}