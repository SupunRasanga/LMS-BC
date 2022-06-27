import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
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

  memberForm!:FormGroup
  memberList: any[] = [];
  isUpdate:boolean=false;
  selectedId:string;

   //Pass member details to UI
   memberNameReturn:any;
   ageReturn:any;
   genderReturn:any;
   addressReturn:any;
   contactNoReturn:any;

   //Check Valid user details
  isValidMemberId:boolean = false;


  //Pagination
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 5;

  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;


  constructor(private fb: FormBuilder,private memberService:MemberService) { }

  initForm(): void {
    this.memberForm = this.fb.group({
      memberId: ['', [Validators.required]],
      memberFullName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contactNo: ['', [Validators.required]]
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
    if (this.memberForm.invalid){
      alert('Please fill required fields');
      return;
  }
  this.loading.next(true);

  if(this.isUpdate){
//Update Record
this.memberService.update(this.memberForm.value,this.selectedId).subscribe(res=>{
       this.getList();
       this.loading.next(false);
       alert('Record has been updated.');
       this.memberForm.reset();

});

  }else{
  //Check user details valid or not
  if(this.isValidMemberId==true){

//Save Record
    this.memberService.create(this.memberForm.value).subscribe(res=>{
      this.memberForm.reset();
      this.getList();
      this.loading.next(false);
    },error =>{
      //alert('Error occured when saving data.\n' + error);
      alert('This member already exist');
      this.memberForm.reset();
    },()=>{
      console.log('completed');
    })
    }else{
      alert('This member is already registered');
      this.memberForm.reset();
    }
  }
}
    getList():void{
      this.memberService.getAll().subscribe(res => {
        this.memberList = res;
        this.collectionSize = this.memberList.length;
      } );
    }

//Check member availability
    onCheckMemberId():void{
      this.memberList.forEach(x => {
        if(x.memberId == this.memberForm.get('memberId').value){
          console.log(this.memberForm.get('memberId').value);
          console.log(x.memberId+"Correct ");
          console.log(x.memberFullName);
          this.memberNameReturn = x.memberFullName;
          this.ageReturn = x.age;
          this.genderReturn = x.gender;
          this.addressReturn = x.address;
          this.contactNoReturn = x.contactNo;
          this.isValidMemberId = true;
          this.memberForm.get('memberFullName').setValue(this.memberNameReturn);
        }
      });
  }

    onUpdate(member:any):void{
      this.openModal();
      this.isUpdate=true,
      this.selectedId=member.id,
      this.memberForm.patchValue({
        memberId:member.memberId,
        memberFullName:member.memberFullName,
        age:member.age,
        gender:member.gender,
        address:member.address,
        contactNo:member.contactNo
      });
    }

onDelete(id:string):void{
  let isConfirm : boolean=confirm('Are you want to delete this Record?');

  if(isConfirm){
    this.memberService.delete(id).subscribe(res =>{
      console.log(res);
      this.getList();
  })
}
}
    onReset(): void{
      this.isUpdate = false;
      this.selectedId = '';

      this.memberForm.reset();

    }

}
