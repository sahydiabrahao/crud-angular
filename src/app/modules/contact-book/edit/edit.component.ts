import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactModel } from 'src/app/model/ContactModel';
import { PhoneModel } from 'src/app/model/PhoneModel';
import { ContactBookService } from 'src/app/service/contact-book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user_id = parseInt(localStorage.getItem('user_id'));
  contact_id : Number;

  contact = new ContactModel();
  phone = new PhoneModel();

  data = this.contact.phones;

  displayedColumns: string[] = ['number', 'action'];

  constructor(
    private router : Router,
    private routeActive : ActivatedRoute,
    private contactBookService : ContactBookService
    ) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['']);
    }

    //Captura ID na URL
    this.contact_id = parseInt(this.routeActive.snapshot.paramMap.get('id'));

    if( this.contact_id != null ){
      this.contactBookService.contactFindById(this.user_id, this.contact_id).subscribe(data => {
        this.contact = data;
        console.log(this.contact)
      });
    }
  }

  onUpdate(){
    this.contactBookService.contactUpdate(this.contact).subscribe (data => {
      this.contactBookService.messageSuccess('Contato editado com sucesso.')
      console.info(data)
    });
  }

  onEditPhone(phone_id, phone_number) {
    this.contactBookService.phoneUpdate(this.contact_id , phone_id, phone_number).subscribe (data => {
      console.info(data)
    });
  }

  onDeletePhone(phone_id) {
    this.contactBookService.phoneDelete(phone_id).subscribe (data => {
      this.contactBookService.messageSuccess('Telefone exlcuído com sucesso.')
      for (let i = 0; i < this.contact.phones.length; i++ ){
        if(phone_id == this.contact.phones[i].id){
          this.contact.phones.splice(i,1);
        }
      }
      console.info(data)
    });
  }

}
