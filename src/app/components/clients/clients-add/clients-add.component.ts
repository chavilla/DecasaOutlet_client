import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/models/Client.model';
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
    private fb:FormBuilder,
  ) {
    super();
   }

  ngOnInit(): void {
    this.form = this.fb.group({
       // first: defaultValue, validators
       ruc: ['',[Validators.required, Validators.pattern(/^[A-Za-z0-9]\w+$/)]],
       name: ['',[Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$)/)]],
       lastName: ['',[Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$/)]],
       phone: ['',[Validators.required, Validators.pattern(/(^6\d{3}-\d{4}$)/)]],
       email: ['',[Validators.required, Validators.pattern(/(^[a-z][\w]+[-\.]?\w+@[a-z]+\.(com)?(net)?(org)?)/)]],
    })
  }

  public saveClient(_form:FormGroup) {
    const { ruc, name, lastName, phone, email } = _form.value;
  }

}
