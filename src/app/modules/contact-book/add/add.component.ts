import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactModel } from 'src/app/model/ContactModel';
import { PhoneModel } from 'src/app/model/PhoneModel';
import { ContactBookService } from 'src/app/service/contact-book.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  user_id = parseInt(localStorage.getItem('user_id'));

  contact = new ContactModel();
  phone = new PhoneModel();

  data = this.contact.phones;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private contactBookService : ContactBookService
    ) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['']);
    }
  }

  onSave(){
    this.contact.user_id = this.user_id;
    this.contactBookService.contactSave(this.contact).subscribe (data => {
      console.info("Salvar OK: " + data)
    });
  }

  onAddPhone(){
   if(this.contact.phones === undefined){
    this.contact.phones = new Array<PhoneModel>();
   }
    //Insere telefone na lista de telefones
    this.contact.phones.push(this.phone);
    this.phone = new PhoneModel();
    return this.data;
  }

  onDeletePhone(numero) {
    for (let i = 0; i < this.contact.phones.length; i++ ){
      if(numero == this.contact.phones[i].number){
        this.contact.phones.splice(i,1);
      }
    }
  }
}
