import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/model/UserModel';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  user : UserModel;

  form_email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService : LoginService,
  ) { }

  ngOnInit() {
  }

  onRecover(){
    this.user.email = this.form_email.value;
    this.loginService.userRecoverPassword(this.user.email);
  }

  onLogin(){
    this.router.navigate([''], {relativeTo: this.route});
  }

}
