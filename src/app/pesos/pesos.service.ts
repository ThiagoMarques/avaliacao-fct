import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from 'app/shared/services/rest.service';

import { Pesos } from './pesos.model';


@Injectable()
export class PesosService extends RestService<Pesos>{

    constructor(protected http: HttpClient){
        super(http);
    }

    public getUrl(): string {
        return 'pesos';
    }

    public mapIdentificador(objeto: Pesos): number {
        return objeto.id_pesos;
    }

    getPesos(): Observable<Pesos[]> {
        return super.obterTodos();
    }

    getPesosId(id): Observable<Pesos> {
        return super.obterPorId(id);
    }

    addPesos(pesos: Pesos) {
        return super.adicionar(pesos);
    }

    deletePesos(id: number) {
        return super.removerPorId(id);
    }

    updatePesos(id, pesos) {
        return super.atualizarPorId(pesos, id);
    }
}