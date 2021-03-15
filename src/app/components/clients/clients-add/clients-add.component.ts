import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientModel } from 'src/app/models/Client.model';
import { ClientService } from 'src/app/services/client.service';
import { NotificationHelper } from '../../../helpers/notification.helper';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent extends NotificationHelper implements OnInit {

  form:FormGroup;
  client:ClientModel;

  constructor(
    private clientService:ClientService,
    private render:Renderer2,
  ) {
    super();
   }

  ngOnInit(): void {
    this.form = this.clientService.form;
    this.clientService.initializeFormGroup();
  }

  public saveClient(_form:FormGroup, messageDialog: HTMLElement) {
    const { ruc, name, lastName, phone, email } = _form.value;
    this.client = new ClientModel(ruc,name,lastName,phone,email);

    //Call the clientService
    this.clientService.saveClientService(this.client).subscribe(
      res =>{
        this.toggleElement(this.render,messageDialog,res.msg, 'success');
        this.form.reset();
      },
      err => this.toggleElement(this.render,messageDialog,err.error.error, 'failed'),
    );
  }

}
