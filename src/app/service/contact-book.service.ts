import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { ContactModel } from '../model/ContactModel';
import { ReportModel } from '../model/ReportModel';

@Injectable({
  providedIn: 'root'
})
export class ContactBookService {

  constructor(
    private http: HttpClient
  ) { }

  //Autenticação (Token Existe?)
  userAuthentication(){
    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null){
      return true;
    }else {
      return false;
    }
  }

  //Pesquisar Todos os Contatos por user_id
  contactFindAll(user_id : Number) : Observable<any>{
    return this.http.get<any>(AppConstants.baseContactBook + '/find/' + user_id);
  }

  //Pesquisar Contato por Id
  contactFindById(user_id : Number, contact_id : Number) : Observable<any>{
    return this.http.get<any>(AppConstants.baseContactBook + '/find-id/' + user_id + "/" + contact_id);
  }

  //Pesquisar Contato por Nome
  contactFindByName(user_id : Number, contact_name : Number ) : Observable<any>{
    return this.http.get<any>(AppConstants.baseContactBook + '/find-name/' +  user_id + "/" + contact_name);
  }

  //Salvar Contato
  contactSave(contact : ContactModel) : Observable<any>{
    return this.http.post<any>(AppConstants.baseContactBook + '/save', contact);
  }

  //Atualizar Contato
  contactUpdate(contact : ContactModel) : Observable<any>{
    return this.http.put<any>(AppConstants.baseContactBook + '/update', contact);
  }

  //Deletar Contato
  contactDelete(contact_id  : Number) : Observable<any>{
    return this.http.delete(AppConstants.baseContactBook + '/delete/' + contact_id , {responseType: 'text'});
  }

  //Deletar Telefone
  phoneDelete(contact_id  : Number) : Observable<any>{
    return this.http.delete(AppConstants.baseContactBook + '/delete-phone/' + contact_id , {responseType: 'text'});
  }

  //Relatório de Contatos
  contactReport() {
    return this.http.get(AppConstants.baseContactBook + '/report', {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

}
