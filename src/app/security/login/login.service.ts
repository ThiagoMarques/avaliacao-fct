import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/security/login/user';
import { RestService } from 'app/shared/services/rest.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService  extends RestService<User> {
    
    user: User;

    constructor(protected http: Http, private router: Router){
        super(http);
    }

    public getUrl(): string {
        return 'users';
    }

    public mapIdentificador(objeto: User): number {
        return objeto.id_acesso;
    }

    getProjeto(): Observable<User[]> {
        return super.obterTodos();
    }

    getProjetoId(id): Observable<User> {
        return super.obterPorId(id);
    }

    addProjeto(user: User) {
        return super.adicionar(user);
    }

    deleteProjeto(id: number) {
        return super.removerPorId(id);
    }

    updateProjeto(id, user) {
        return super.atualizarPorId(user, id);
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    loginUser(user: User): Observable<User> {
        return this.http.post(`${this.getUrlBase()}/${this.getUrl()}`, user, this.getDefaultRequestOptions())
        .map(response => response.json())
        .do(users => {
            this.user = users;
        });
    }

    // login(email: string, password: string): Observable<User> {
    //     debugger
    //     return this.http.post('http://localhost:3000/users', { email: email, password: password } )
    //     .map(response => response.json())
    //     .do(user => {
    //         this.user = user;
    //     });
    // }

    handleLogin() {
        this.router.navigate(['/login']);
    }

    logout() {
        this.user = undefined;
        this.router.navigate(['/login']);
    }

}
