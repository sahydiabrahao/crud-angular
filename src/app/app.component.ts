import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  OnInit(){
  }

  //Menu Lateral
  onContactBook(){
    this.router.navigate(['contact-book'], {relativeTo: this.route});
  }

  onAdd(){
    this.router.navigate(['contact-book/add'], {relativeTo: this.route});
  }

  onReport(){
    this.router.navigate(['contact-book/report'], {relativeTo: this.route});
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate([''], {relativeTo: this.route});
  }

}
