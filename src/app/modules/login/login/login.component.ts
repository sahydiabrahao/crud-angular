import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import {FormControl, Validators} from '@angular/forms'
import { UserModel } from '../../../model/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user : UserModel;

  form_email = new FormControl('', [Validators.required, Validators.email]);
  form_password = new FormControl('', [Validators.required]);

  hide = true;

  constructor(
    private loginService : LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onEnter(){
    this.user.email = this.form_email.value;
    this.user.password = this.form_password.value

    this.loginService.userLogin(this.user);

    this.loginService.userFindByEmail(this.user.email).subscribe(data => {

      //Usuário ID Logado
      localStorage.setItem('user_id', data.id );

    });
  }

  onRegister(){
    this.router.navigate(['register'], {relativeTo: this.route});
  }

  onRecover(){
    this.router.navigate(['recover'], {relativeTo: this.route});
  }

}
