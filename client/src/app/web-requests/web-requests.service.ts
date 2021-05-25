import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WebRequestsService {
  private http: HttpClient
  readonly ROOT_URL;

  constructor(http: HttpClient) {
    this.ROOT_URL = 'http://localhost:300';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  delete(url: string, payload: Object) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }
}
