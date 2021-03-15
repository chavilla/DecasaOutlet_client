import { Component, Inject ,OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  form:FormGroup;

  constructor(
    private clientService:ClientService,
    private dialog:MatDialogRef<ClientUpdateComponent>,
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
        console.log(err);
      }
     );
  } // end updateClient

}
