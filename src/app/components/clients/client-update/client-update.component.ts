import { Component, Inject ,OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  form:FormGroup;
  redirect:RedirectionHelper;

  constructor(
    private clientService:ClientService,
    private dialog:MatDialogRef<ClientUpdateComponent>,
    private loginService: LoginService,
    private route:Router,
    @Inject(MAT_DIALOG_DATA)
    public data:object,
  ) { }

  ngOnInit(): void {
    this.form = this.clientService.form;
    this.clientService.populateForm(this.data);
  }

  updateClient() {
    this.clientService.updateClientService(this.form.value).subscribe( 
      res => {
        this.dialog.close(this.form.value);
      },
      err => {
        if(err.status ===401){
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }      
      }
     );
  } // end updateClient

}
