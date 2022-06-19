import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss']
})
export class ReturnBookComponent implements OnInit {
  display = "none";
  constructor() { }

  ngOnInit(): void {
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
