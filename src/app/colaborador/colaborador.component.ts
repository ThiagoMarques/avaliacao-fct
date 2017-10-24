import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { ColaboradorService } from './colaborador.service';
import { Colaborador } from './colaborador.model';
import { colaboradorRouting } from './colaborador.routes';

@Component({
  selector: 'mt-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  private Colaborador: Colaborador[] = [];
  private colaboradorCarregada: boolean = true;
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Colaborador> = new Subject();
  
  constructor(
    private _colaboradorService: ColaboradorService
  ) { }

  ngOnInit() {
     
     this.dtOptions = {
      //pagingType: 'full_numbers'
      //searching: true
    };
    
    this._colaboradorService.getColaborador()
    .subscribe(colaborador =>{ 
      this.Colaborador = colaborador
      this.colaboradorCarregada = false;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  deleteColaborador(colaborador) {
    if (confirm("Tem certeza que quer APAGAR o Colaborador #" + colaborador.id_colaborador + " - " + colaborador.nome + "?")) {
      var index = this.Colaborador.indexOf(colaborador);
      this.Colaborador.splice(index, 1);

      this._colaboradorService.deleteColaborador(colaborador.id_colaborador)
        .subscribe(null,
        err => {
          alert("Não foi possível apagar o Colaborador!");
          this.Colaborador.splice(index, 0, colaborador);
        });
    }
  }
}
