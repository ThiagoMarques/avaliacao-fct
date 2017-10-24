import { DataTableDirective } from 'angular-datatables';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { AbrangenciaService } from 'app/abrangencia/abrangencia.service';
import { Abrangencia } from './abrangencia.model';

@Component({
  selector: 'mt-abrangencia',
  templateUrl: './abrangencia.component.html',
  styleUrls: ['./abrangencia.component.css']
})
export class AbrangenciaComponent implements OnInit, AfterViewInit {

  private Abrangencia: Abrangencia[] = [];
  private abrangenciaCarregada: boolean = true;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Abrangencia> = new Subject();
  lang: string = 'Portuguese-Brasil';

  constructor(private _abrangenciaService: AbrangenciaService) { }

  ngOnInit() {

    this.dtOptions = {
      //pagingType: 'full_numbers'
      //searching: true
      language: {
        url: `assets/language/datatables/${this.lang}.json`
      }
    };
    
    this._abrangenciaService.getAbrangencia()
    .subscribe(abrangencia => {
      this.Abrangencia = abrangencia
      this.abrangenciaCarregada = false;
       // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }

  deleteAbrangencia(abrangencia){
    if (confirm("Tem certeza que quer APAGAR a Abrangência #" + abrangencia.id_abrangencia + " ?")) {
      var index = this.Abrangencia.indexOf(abrangencia);
      this.Abrangencia.splice(index, 1);
      //debugger
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{  
        // Destroy the table first
        dtInstance.destroy();
        
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      })

      this._abrangenciaService.deleteAbrangencia(abrangencia.id_abrangencia)
        .subscribe(null,
          err => {
            alert("A abrangência não foi apagada!");
            // Revert the view back to its original state
            this.Abrangencia.splice(index, 0, abrangencia);
            throw err;
          });
    }
  }
}
