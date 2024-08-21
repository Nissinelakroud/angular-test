import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postUser(data:any) {
    return this.http.post('http://localhost:3000/users', data)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${id}`);
  }

  DeleteUser(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`http://localhost:3000/users/${id}`);
  }
  
  updateUser(id: number, data:any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/users/${id}`, data);
  }

}

