import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KardexModel } from 'src/app/models/Kardex.model';
import { KardexService } from 'src/app/services/kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnDestroy {
  
  kardexes:Array<KardexModel>=[];
  form:FormGroup;
  loading:boolean;

  constructor(
    private kardexService:KardexService,
  ) { 
    this.form = this.kardexService.form;
  }

  ngOnDestroy(): void {
    this.form.reset();
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
          this.kardexService.kardexes = res;
          resolve(this.kardexService.kardexes);
        }  
      },err =>{
        reject(err);
      });
    });
  }
}
