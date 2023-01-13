import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import ('./modules/login/login.module').then(m=>m.LoginModule)},
  {path: 'login/contact-book', loadChildren: () => import ('./modules/contact-book/contact-book.module').then(m=>m.ContactBookModule)},
  {path: 'contact-book', loadChildren: () => import ('./modules/contact-book/contact-book.module').then(m=>m.ContactBookModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
