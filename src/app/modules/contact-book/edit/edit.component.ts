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
    let contact_id = parseInt(this.routeActive.snapshot.paramMap.get('id'));

    if( contact_id != null ){
      this.contactBookService.contactFindById(this.user_id, contact_id).subscribe(data => {
        this.contact = data;
        console.log(this.contact)
      });
    }
  }

  onUpdate(){
    this.contactBookService.contactUpdate(this.contact).subscribe (data => {
      console.info("Editar OK: " + data)
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

  onDeletePhone(number) {
    for (let i = 0; i < this.contact.phones.length; i++ ){
      if(number == this.contact.phones[i].number){
        this.contact.phones.splice(i,1);
      }
    }
  }

}
