import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportModel } from 'src/app/model/ReportModel';
import { ContactBookService } from 'src/app/service/contact-book.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  user_id = parseInt(localStorage.getItem('user_id'));

  showModal: boolean = false;
  showDate: boolean = false;

  report = new ReportModel();

  constructor(
    private router : Router,
    private contactBookService : ContactBookService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['']);
    }
  }

  onGenerate () {
    this.showModal = !this.showModal;

    this.contactBookService.contactReport();

  }
  onClose(){
    this.showModal = !this.showModal;
  }
  onReport () {
    this.showDate = false;
  }

  onReportDate () {
    this.showDate = true;
  }


}
