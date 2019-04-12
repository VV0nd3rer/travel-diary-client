import { Component, OnInit } from '@angular/core';
import {BookService} from "./book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  testResult: string = '';
  constructor(private bookService: BookService) { }

  ngOnInit() {
  }
  testMe():void {
    this.bookService.getTestCall().subscribe(
        res => {
          console.log(res);
          this.testResult = res;
        },
        error => {
          console.log(error);
        }
    )
  }
}
