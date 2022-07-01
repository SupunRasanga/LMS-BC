import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

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

  bookForm!:FormGroup
  bookList: any[] = [];
  isUpdate:boolean=false;
  selectedId:string;

  //Pass book name and member name in to UI
  bookNameReturn:any;
  authorNameReturn:any;
  publishedYearReturn:any;
  priceReturn:any;

  //Check Valid user details
  isValidBookId:boolean = true;


  //Pagination
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 5;

  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;

  constructor( private fb: FormBuilder,private bookService:BookService) { }

  initForm(): void {
    this.bookForm = this.fb.group({
      bookId: ['', [Validators.required]],
      bookName: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      publishYear: ['', [Validators.required]],
      price: ['', [Validators.required]]
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
    this.getList();
  }

  openModal() {
    this.display = "block";
  }

  onCloseHandled() {
    this.onReset();
    this.display = "none";
  }

  onSaveOrUpdate(): void {
    if (this.bookForm.invalid){
      alert('Please fill required fields');
      return;
  }
  this.loading.next(true);

  if(this.isUpdate){
//Update Record
this.bookService.update(this.bookForm.value,this.selectedId).subscribe(res=>{
       this.getList();
       this.loading.next(false);
       alert('Record has been updated.');
       this.bookForm.reset();

});

  }else{

//Check user details valid or not
  if(this.isValidBookId == true){
  //Save Record
      this.bookService.create(this.bookForm.value).subscribe(res=>{
        this.bookForm.reset();
        this.getList();
        this.loading.next(false);
      },error =>{
        //alert('Error occured when saving data.\n' + error);
        alert('This Book already exist');
        this.bookForm.reset();
      },()=>{
        console.log('completed');
      })
    }else{
      alert('This book is already registered');
      this.bookForm.reset();
    }
  }
  }

    getList():void{
      this.bookService.getAll().subscribe(res => {
        this.bookList = res;
        this.collectionSize = this.bookList.length;
        console.log(this.bookList);
      } );
    }
    onUpdate(book:any):void{
      this.openModal();
      this.isUpdate=true,
      this.selectedId=book.id,
      this.bookForm.patchValue({
        bookId:book.bookId,
        bookName:book.bookName,
        authorName:book.authorName,
        publishYear:book.publishYear,
        price:book.price,
      });
    }

  //Check user input bookId availability
  onCheckBookId():void{
    this.bookList.forEach(x => {
      if(x.bookId == this.bookForm.get('bookId').value){
        console.log(x.bookId+"Correct ");
        console.log(x.bookName);
        this.bookNameReturn = x.bookName;
        this.authorNameReturn = x.authorName;
        this.publishedYearReturn = x.publishYear;
        this.priceReturn = x.price;
        this.isValidBookId = false;
        this.bookForm.get('bookName').setValue(this.bookNameReturn);
        this.bookForm.get('authorName').setValue(this.authorNameReturn);
        this.bookForm.get('publishYear').setValue(this.publishedYearReturn);
        this.bookForm.get('price').setValue(this.priceReturn);
      }
    });
}

onDelete(id:string):void{
  let isConfirm : boolean=confirm('Are you want to delete this Record?');

  if(isConfirm){
    this.bookService.delete(id).subscribe(res =>{
      console.log(res);
      this.getList();
  })
}
}
    onReset(): void{
      this.isUpdate = false;
      this.selectedId = '';

      this.bookForm.reset();

    }

}
