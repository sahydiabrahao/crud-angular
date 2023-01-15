import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactModel } from 'src/app/model/ContactModel';
import { ContactBookService } from 'src/app/service/contact-book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  user_id = parseInt(localStorage.getItem('user_id'));

  contact : ContactModel = new ContactModel();
  contacts : Array<ContactModel[]>;

  showModal: boolean = false;

  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactBookService : ContactBookService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['']);
    }else{
      this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
        this.contacts = data;
        //console.log(this.contacts)
      });
    }
  }

  onSearch(){
    if(this.contact.name == null || this.contact.name === ""){
      this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
        this.contacts = data;
      })

    }else{
      this.contactBookService.contactFindByName(this.user_id, this.contact.name.toUpperCase()).subscribe(data => {
        this.contacts = data;
      });
    }
  }

  onDetail (contact_id : Number) {
    this.showModal = !this.showModal;

    if( contact_id != null ){
      this.contactBookService.contactFindById(this.user_id, contact_id).subscribe(data => {
        this.contact = data;
      });
    }
  }

  onCloseDetail() {
    this.showModal = !this.showModal;
  }

  onEdit(contact_id : Number){
    this.router.navigate(['edit/' + contact_id], {relativeTo: this.route});
  }

  onDelete(contact_id : Number){
    if(confirm("Você tem certeza que deseja deletar este registro?")){
      //Service: Deletar ID
      this.contactBookService.contactDelete(contact_id).subscribe(data => {
        console.log(data)
        this.contactBookService.messageSuccess('Contato excluido com sucesso.')

        this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
          this.contacts = data;
        });
      });
    }
  }
}
