import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient
    ) { }



  create(book: any): Observable<any>{
    //return this.http.post(`${this.baseAPIUrl}/book.json`,book);
    // const headers : HttpHeaders =  new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    return this.http.post(`${environment.baseAPIUrl}/book.json`,book);
  }

  getAll(): Observable<any>{
    //return this.http.get(`${this.baseAPIUrl}/customer.json`).pipe(map((res) => {
    return this.http.get(`${environment.baseAPIUrl}/book.json`).pipe(map((res) => {
      const books:any[] = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          books.push({...res[key], id: key});
        }
      }
      return books;
    }));
  }

  update(book: any, id: string): Observable<any>{
    //return this.http.put(`${this.baseAPIUrl}/book/${id}.json`,book);
    return this.http.put(`${environment.baseAPIUrl}/book/${id}.json`,book);
  }

  delete(id: string): Observable<any>{
    //return this.http.delete(`${this.baseAPIUrl}/book/${id}.json`);
    return this.http.delete(`${environment.baseAPIUrl}/book/${id}.json`);
  }

}
