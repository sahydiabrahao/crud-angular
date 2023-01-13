import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { UserModel } from '../model/UserModel';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //Autenticação (Token Existe?)
  userAuthentication(){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null){
      return true;
    }else {
      return false;
    }
  }

  //Pesquisar User por Email
  userFindByEmail(user_email) : Observable<any>{
    return this.http.get<any>(AppConstants.baseLogin + '/' + user_email)
  }

  //Registrar User
  userRegister(user : UserModel) : Observable<any>{
    return this.http.post<any>(AppConstants.baseLogin + '/register' , user);
  }

  //Login (Com verificação de token)
  userLogin(user: any){

    //Dados: user {"login": "login@login", "senha": "1234"}
    //JSON.stringify(user) > Converte para uma String estilo JSON
    return this.http.post(AppConstants.baseLogin, JSON.stringify(user)).subscribe(data => {

      //Resposta data > JSON.stringify (Formato JSON só que String) > JSON.parse (Tipo JSON) > Token limpo
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      //Armazena o var(token) em camada escondida na variavel "token"
      localStorage.setItem("token",token)

      //console.info("TOKEN: " + localStorage.getItem("token"));

      //Redireciona
      //this.router.navigate(['contact-book']);

    },
    ErrorEvent => {
      alert("Usuário ou Senha Incorretos!")
      console.error("Erro ao fazer login")
    });
  }

  //Recuperar Senha
  userRecoverPassword(user_email: any){
    console.log(user_email)
    //Spring: LoginController
    return this.http.post(AppConstants.baseLogin + '/recover-password', user_email).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error);
    },

    ErrorEvent => {
      alert("Não foi possível recuperar Login!")
      console.error("Não foi possível recuperar Login!")
    });
  }

}
