import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  create(member: any): Observable<any>{
    //return this.http.post(`${this.baseAPIUrl}/member.json`,member);
    // const headers : HttpHeaders =  new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    return this.http.post(`${environment.baseAPIUrl}/member.json`,member);
  }

  getAll(): Observable<any>{
    //return this.http.get(`${this.baseAPIUrl}/customer.json`).pipe(map((res) => {
    return this.http.get(`${environment.baseAPIUrl}/member.json`).pipe(map((res) => {
      const members:any[] = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          members.push({...res[key], id: key});
        }
      }
      return members;
    }));
  }

  update(member: any, id: string): Observable<any>{
    //return this.http.put(`${this.baseAPIUrl}/member/${id}.json`,member);
    return this.http.put(`${environment.baseAPIUrl}/member/${id}.json`,member);
  }

  delete(id: string): Observable<any>{
    //return this.http.delete(`${this.baseAPIUrl}/member/${id}.json`);
    return this.http.delete(`${environment.baseAPIUrl}/member/${id}.json`);
  }


}
