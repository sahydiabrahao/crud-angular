import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/UserModel';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar : MatSnackBar,
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
      this.snackBar.open('Usuário registrado com sucesso.', 'x', {
        duration: 3000,
        panelClass: ['msg-success'],
        verticalPosition: 'top'
      });
      console.log(data)
    })
  };

}
