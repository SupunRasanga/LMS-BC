import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.scss']
})
export class IssueBookComponent implements OnInit {
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

  //Pass book name and member name in to UI
  bookReturn:any;
  memberReturn:any;

  //Check Valid user details
  isValidMemberId:boolean = false;
  isValidBookId:boolean = false;

  //Pagination
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 5;

  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;

  constructor(private fb: FormBuilder, private bookService: BookService, private memberService: MemberService, private issueBookService: IssueBookService) { }

  initForm(): void {
    this.bookForm = this.fb.group({
      bookId: ['', [Validators.required]],
      bookName: ['', [Validators.required]],
      memberId: ['', [Validators.required]],
      memberName: ['', [Validators.required]],
      issueDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]]

    });
  }



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
    this.initForm();
    this.getBookList();
    this.getIssueBookList();
    this.getMemberList();
  }


  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.onReset();
    this.display = "none";
  }

  //Save or update Data
  onSaveOrUpdate(): void {
    if (this.bookForm.invalid){
      alert('Please fill required fields');
      return;
  }
  this.loading.next(true);

  if(this.isUpdate){
//Update Record
this.issueBookService.update(this.bookForm.value,this.selectedId).subscribe(res=>{
       this.getIssueBookList();
       this.loading.next(false);
       alert('Record has been updated.');
       this.bookForm.reset();

});

  }else{
//Check user details valid or not
  if(this.isValidMemberId==true && this.isValidBookId == true){

    //Save Record
    this.issueBookService.create(this.bookForm.value).subscribe(res=>{
      this.bookForm.reset();
      this.getIssueBookList();
      this.loading.next(false);
    },error =>{
      //alert('Error occured when saving data.\n' + error);
      alert('This Book already exist');
      this.bookForm.reset();
    },()=>{
      console.log('completed');
    })
  }else{
    alert('Please Enter Correct Details');
    this.bookForm.reset();
  }

}
  }

  //Get all data in book issue table
  getIssueBookList():void{
    this.issueBookService.getAll().subscribe(res => {
      this.issueBookList = res;
      this.collectionSize = this.issueBookList.length;
    } );
  }

  //Get all data in book table
  getBookList():void{
    this.bookService.getAll().subscribe(res => {
      this.bookList = res;
    } );
  }

  //Get all data in member table
  getMemberList():void{
    this.memberService.getAll().subscribe(res => {
      this.memberList = res;
    } );
  }

  //Check user input bookId availability
  onCheckBookId():void{
      this.bookList.forEach(x => {
        if(x.bookId == this.bookForm.get('bookId').value){
          console.log(x.bookId+"Correct ");
          console.log(x.bookName);
          this.bookReturn = x.bookName;
          this.isValidBookId = true;
          this.bookForm.get('bookName').setValue(this.bookReturn);
        }
      });
  }

  onCheckMemberId():void{
      this.memberList.forEach(x => {
        if(x.memberId == this.bookForm.get('memberId').value){
          console.log(this.bookForm.get('memberId').value);
          console.log(x.memberId+"Correct ");
          console.log(x.memberFullName);
          this.memberReturn = x.memberFullName;
          this.isValidMemberId = true;
          this.bookForm.get('memberName').setValue(this.memberReturn);
        }
      });
  }



  onUpdate(book:any):void{
    this.openModal();
    this.isUpdate=true,
    this.selectedId=book.id,
    this.bookForm.patchValue({
      bookId:book.bookId,
      bookName:book.bookName,
      memberId:book.memberId,
      memberName:book.memberName,
      issueDate:book.issueDate,
      dueDate:book.dueDate
    });
  }

onDelete(id:string):void{
let isConfirm : boolean=confirm('Are you want to delete this Record?');

if(isConfirm){
  this.issueBookService.delete(id).subscribe(res =>{
    console.log(res);
    this.getIssueBookList();
})
}
}
  onReset(): void{
    this.isUpdate = false;
    this.selectedId = '';

    this.bookForm.reset();

  }





}



