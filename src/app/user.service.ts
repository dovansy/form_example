import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = 'https://60595bcab11aba001745bf30.mockapi.io/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(
      'https://60595bcab11aba001745bf30.mockapi.io/User'
    );
  }

  createUser(data: any) {
    return this.httpClient.post(
      'https://60595bcab11aba001745bf30.mockapi.io/User',
      data
    );
  }
}
