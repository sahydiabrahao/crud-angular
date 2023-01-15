import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/UserModel';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user : UserModel = new UserModel();

  form_email = new FormControl('', [Validators.required, Validators.email]);
  form_password = new FormControl('', [Validators.required]);

  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService : LoginService,
  ) { }

  ngOnInit() {

  }

  onLogin(){
    this.router.navigate([''], {relativeTo: this.route});
  }

  onRegister(){
    this.user.email = this.form_email.value;
    this.user.password = this.form_password.value;

    this.loginService.userRegister(this.user).subscribe (data => {
      this.loginService.messageError('Usuário registrado com sucesso.')
      console.log(data);
    })
  };
}
