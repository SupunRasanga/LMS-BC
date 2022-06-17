import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  display = "none";

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth()+1;
  currentDay = this.date1.getUTCDate();

  //YYYY-MM-DD
  TodayDate = "2022-06-13";
  issuedate = '';
  FinalMonth:any;
  FinalDay:any;


  constructor() { }

  ngOnInit(): void {
    if(this.currentMonth <10){
      this.FinalMonth = "0"+this.currentMonth;
    }else{
      this.FinalMonth = this.currentMonth;
    }

    if(this.currentDay <10){
      this.FinalDay = "0"+ this.currentDay;
    }else{
      this.FinalDay = this.currentDay;
    }

    this.TodayDate = this.currentYear+ "-"+ this.FinalMonth+ "-"+ this.FinalDay;
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

}
