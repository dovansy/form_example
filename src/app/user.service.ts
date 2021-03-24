import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

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
    return this.httpClient.get(apiUrl);
  }

  createUser(data: any) {
    return this.httpClient.post(apiUrl, data);
  }

  updateUser(id: number, data: any) {
    return this.httpClient.put(apiUrl + '/' + id, data);
  }

  getDetail(id: number) {
    return this.httpClient.get(apiUrl + '/' + id);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(apiUrl + '/' + id);
  }
}
