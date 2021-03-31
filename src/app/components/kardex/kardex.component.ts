import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KardexModel } from 'src/app/models/Kardex.model';
import { KardexService } from 'src/app/services/kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {
  
  kardexes:Array<KardexModel>=[];
  form:FormGroup;
  loading:boolean;

  constructor(
    private kardexService:KardexService,
  ) { 
    this.form = this.kardexService.form;
  }

  ngOnInit(): void {
  }

  onSubmit(form:FormGroup) {
    
    this.loading = true;
    this.getKardexes(form).then( res =>{
      this.kardexes.push(res[0]);
      this.loading = false;
    }).catch(e => {    
      console.log(e);
    });
  }

  getKardexes(form:FormGroup){ 
    return new Promise((resolve,reject) =>{
      this.kardexService.getKardexByCodeBar(form.value.codebar).subscribe( res => {
        if(res.length===0){
          resolve(res)
        }
        else {
          this.kardexService.kardexes = res[0];
          resolve(this.kardexService.kardexes);
        }  
      },err =>{
        reject(err);
      });
    });
  }
}
