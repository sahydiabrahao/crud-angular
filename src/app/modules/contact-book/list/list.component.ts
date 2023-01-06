import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  contactName = new FormControl();

  showModal: boolean = false;

  displayedColumns: string[] = ['name', 'email', 'action'];

  form = this.formBuilder.group({
    id:             [''],
    name:           [''],
    cpf:            [''],
    date:           [''],
    zip_code:       [''],
    email:          [''],
    phones:         [''],
    user_id:        [''],
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactBookService : ContactBookService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //VERIFICA SE TEM TOKEN
    if(localStorage.getItem('token') == null){
      //Redireciona
      this.router.navigate(['']);
    }else{
      this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
        this.contacts = data;
      });
    }

  }

  onSearch(){
    if(this.contactName.value == null || this.contactName.value === ""){
      //Service: Consultar Todos
      this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
        this.contacts = data;
      })

    }else{
      //Service: Consultar Nome
      this.contactBookService.contactFindByName(this.user_id, this.contactName.value.toUpperCase()).subscribe(data => {
      this.contacts = data;
      });
    }
  }

  onDetail (id) {
    this.showModal = !this.showModal;

    if( id != null ){
      this.contactBookService.contactFindById(this.user_id, id).subscribe(data => {
        this.contact = data;

        var numeros: String[] =[] ;

        for (let i in this.contact.phones) {
          numeros.push(this.contact.phones[i].numero);
        }

        this.form.setValue({
          id :            this.contact.id,
          name:           this.contact.name,
          cpf:            this.contact.cpf,
          date:           this.contact.date,
          zip_code:       this.contact.zip_code,
          email:          this.contact.email,
          phones:         numeros,
          user_id:        this.user_id
        });
      });
    }
  }

  onEdit(id){
    this.router.navigate(['edit/' + id], {relativeTo: this.route});
  }

  onDelete(id){
    if(confirm("Você tem certeza que deseja deletar este registro?")){
      //Service: Deletar ID
      this.contactBookService.contactDelete(id).subscribe(data => {
        console.log('Delete: ' + data)

        this.contactBookService.contactFindAll(this.user_id).subscribe(data => {
          this.contacts = data;
        });
      });
    }
  }

}
