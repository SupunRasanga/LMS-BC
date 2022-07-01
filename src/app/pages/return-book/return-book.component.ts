import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {
  display = "none";

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth()+1;
  currentDay = this.date1.getUTCDate();

  //YYYY-MM-DD
  TodayDate = "2022-06-13";
  FinalMonth:any;
  FinalDay:any;

  bookForm!:FormGroup
  issueBookList : any[] = [];
  bookList: any[] = [];
  memberList: any[] = [];
  isUpdate:boolean=false;
  selectedId:string;

  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 5;

  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;


  constructor(private fb: FormBuilder, private bookService: BookService, private memberService: MemberService, private issueBookService: IssueBookService) { }

  ngOnInit(): void {
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
